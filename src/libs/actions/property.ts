'use server'
import { Prisma, Property } from "@prisma/client"
import { upsertPropertyActionSchema } from "@/zodSchema/property.zod"

import prisma from "@/libs/prisma"
import { flattenValidationErrors } from "next-safe-action"
import { authAction } from "@/libs/actions/safeAction"

export const upsertProperty = authAction
  .schema(upsertPropertyActionSchema, {
    handleValidationErrorsShape: (errors) => flattenValidationErrors(errors).fieldErrors
  })
  .action(async ({ ctx, parsedInput: { basic, location, features, contact, pictures, id, pictureIdsToDelete } }) => {
    try {
      const newProperty = await prisma.property.upsert({
        where: {
          id: id
        },
        update: {
          name: basic.name,
          description: basic.description,
          price: parseFloat(basic.price),
          type: {
            connect: {
              id: basic.typeId
            }
          },
          status: {
            connect: {
              id: basic.statusId
            }
          },
          location: {
            update: location
          },
          feature: {
            update: {
              ...features,
              bedrooms: parseInt(features.bedrooms),
              bathrooms: parseInt(features.bathrooms),
              parkingSpots: parseInt(features.parkingSpots),
              area: parseInt(features.area),
            },
          },
          contact: {
            update: contact
          },
          pictures: {
            deleteMany: {
              id: {
                in: pictureIdsToDelete
              }
            },
            create: pictures.map(url => ({ url })),
          },
        },
        create: {
          name: basic.name,
          description: basic.description,
          price: parseFloat(basic.price),
          type: {
            connect: {
              id: basic.typeId
            }
          },
          status: {
            connect: {
              id: basic.statusId
            }
          },
          user: {
            connect: {
              id: ctx.user.id
            }
          },
          location: {
            create: location
          },
          feature: {
            create: {
              ...features,
              bedrooms: parseInt(features.bedrooms),
              bathrooms: parseInt(features.bathrooms),
              parkingSpots: parseInt(features.parkingSpots),
              area: parseInt(features.area),
            },
          },
          contact: {
            create: contact
          },
          pictures: {
            create: pictures.map(url => ({ url })),
          },
        },
      })

      /**
       * Note: in JS, Decimal objects are not supported, it will cause the error:
       * Warning: Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported.
       * {id: ..., name: ..., description: "qqq", price: Decimal, userId: ..., typeId: ..., statusId: ..., locationId: ..., featureId: ..., contactId: ...}
       * 
       * so we need to convert them to plain objects 
       * and to prevent the loss of precision, we need to convert the decimal price to a string.
       */
      const plainProperty = {
        ...newProperty,
        price: newProperty.price.toString(),
      }

      return plainProperty
    } catch (error) {
      console.error("Error creating property:", error)
      throw new Error("Failed to create property")
    }
  })