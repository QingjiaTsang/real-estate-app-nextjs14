'use server'
import { Prisma, Property } from "@prisma/client"
import { addPropertyActionSchema } from "@/zodSchema/property.zod"

import prisma from "@/libs/prisma"
import { flattenValidationErrors } from "next-safe-action"
import { authAction } from "@/libs/actions/safeAction"
import { z } from "zod"

const includeSchema = z.object({
  include: z.object({
    type: z.boolean().optional(),
    status: z.boolean().optional(),
    location: z.boolean().optional(),
    feature: z.boolean().optional(),
    pictures: z.boolean().optional(),
    contact: z.boolean().optional(),
  }).optional()
})

export const addProperty = authAction
  .schema(addPropertyActionSchema, {
    handleValidationErrorsShape: (errors) => flattenValidationErrors(errors).fieldErrors
  })
  .action(async ({ ctx, parsedInput: { basic, location, features, contact, pictures } }) => {
    try {
      const newProperty = await prisma.property.create({
        data: {
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

// export const getAllProperties = authAction
//   .schema(includeSchema)
//   .action(async ({ ctx, parsedInput: { include } }) => {
//     const properties = await prisma.property.findMany({
//       include: include
//     })
//     return properties
//   })

// export const getPropertiesByAuth = authAction
//   .schema(includeSchema)
//   .action(async ({ ctx, parsedInput: { include } }) => {
//     const properties = await prisma.property.findMany({
//       where: {
//         userId: ctx.user.id,
//       },
//       include: include
//     })

//     type PropertyWithInclude = Prisma.PropertyGetPayload<{ include: typeof include }>

//     return properties.map((property): PropertyWithInclude => {
//       const { price, ...rest } = property;
//       return {
//         ...rest,
//         price: price instanceof Prisma.Decimal ? price : new Prisma.Decimal(price as unknown as string),
//       } as PropertyWithInclude;
//     });
//   })

// export const getPropertyById = authAction
//   .schema(includeSchema.extend({ id: z.string() }))
//   .action(async ({ ctx, parsedInput: { id, include } }) => {
//     const property = await prisma.property.findUnique({
//       where: {
//         id,
//       },
//       include: include
//     })
//     return property
//   })