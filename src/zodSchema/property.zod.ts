import { z } from "zod"
import validator from "validator"

const basicSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  typeId: z.string().min(1, { message: "Type is required" }),
  statusId: z.string().min(1, { message: "Status is required" }),
  price: z.string()
    .refine((val) =>
      validator.isCurrency(val, {
        allow_decimal: true,
        digits_after_decimal: [1, 2],
        allow_negatives: false,
      }), { message: "Invalid price format" })
})

const locationSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip: z.string().refine((val) => validator.isPostalCode(val, "any"), { message: "Invalid ZIP code" }),
  landmarks: z.string().min(1, { message: "Landmark is required" }),
  country: z.string().min(1, { message: "Country is required" }),
})

const featuresSchema = z.object({
  bedrooms: z.string()
    .refine((val) =>
      validator.isInt(val, { min: 0 }) && (val === '0' || !val.startsWith('0')),
      { message: "Bedrooms must be a non-negative integer and cannot start with 0 unless it is 0" }
    ),

  bathrooms: z.string()
    .refine((val) =>
      validator.isInt(val, { min: 0 }) && (val === '0' || !val.startsWith('0')),
      { message: "Bathrooms must be a non-negative integer and cannot start with 0 unless it is 0" }
    ),

  parkingSpots: z.string()
    .refine((val) =>
      validator.isInt(val, { min: 0 }) && (val === '0' || !val.startsWith('0')),
      { message: "Parking spots must be a non-negative integer and cannot start with 0 unless it is 0" }
    ),

  area: z.string()
    .refine((val) =>
      validator.isInt(val, { min: 0 }) && (val === '0' || !val.startsWith('0')),
      { message: "Area must be a non-negative integer and cannot start with 0 unless it is 0" }
    ),

  hasSwimmingPool: z.boolean(),
  hasGardenOrYard: z.boolean(),
  hasBalconyOrPatio: z.boolean(),
})

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().refine(validator.isMobilePhone, { message: "Invalid phone number" }),
})

export const addPropertyFormSchema = z.object({
  basic: basicSchema,
  location: locationSchema,
  features: featuresSchema,
  pictures: z.array(z.instanceof(File)).min(1, { message: "At least one picture is required" }),
  contact: contactSchema,
})

export const addPropertyActionSchema = addPropertyFormSchema.omit({ pictures: true }).extend({
  pictures: z.array(z.string()).min(1, { message: "At least one picture is required" }),
})

export type AddPropertyFormSchema = z.infer<typeof addPropertyFormSchema>
