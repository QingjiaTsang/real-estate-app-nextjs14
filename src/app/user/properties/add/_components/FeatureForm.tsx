import React from "react"

import { Button, Card, CardBody, CardFooter, cn, Input, Checkbox } from "@nextui-org/react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const featureFormSchema = z.object({
  bedrooms: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, { message: "Bedrooms must be a positive number" }),
  bathrooms: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, { message: "Bathrooms must be a positive number" }),
  parkingSpots: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0, { message: "Parking spots must be a non-negative number" }),
  area: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, { message: "Area must be a positive number" }),
  hasSwimmingPool: z.boolean(),
  hasGardenOrYard: z.boolean(),
  hasBalconyOrPatio: z.boolean(),
})

type FeatureFormSchema = z.infer<typeof featureFormSchema>

export type FeatureFormProps = {
  onClickNext: () => void
  onClickPrevious: () => void
  className?: string
}

const FeatureForm = ({ onClickNext, onClickPrevious, className }: FeatureFormProps) => {
  const { register, formState: { errors }, trigger, setValue } = useForm<FeatureFormSchema>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      bedrooms: 0,
      bathrooms: 0,
      parkingSpots: 0,
      area: 0,
      hasSwimmingPool: false,
      hasGardenOrYard: false,
      hasBalconyOrPatio: false,
    },
  })

  return (
    <div className={cn("container mx-auto p-4", className)}>
      <Card>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="col-span-2 md:col-span-1">
            <Input {...register("bedrooms")} label="Bedrooms" />
            {errors.bedrooms && <p className="text-danger">{errors.bedrooms.message}</p>}
          </div>

          <div className="col-span-2 md:col-span-1">
            <Input {...register("bathrooms")} label="Bathrooms" />
            {errors.bathrooms && <p className="text-danger">{errors.bathrooms.message}</p>}
          </div>

          <div className="col-span-2 md:col-span-1">
            <Input {...register("parkingSpots")} label="Parking Spots" />
            {errors.parkingSpots && <p className="text-danger">{errors.parkingSpots.message}</p>}
          </div>

          <div className="col-span-2 md:col-span-1">
            <Input {...register("area")} label="Area (sq ft)" />
            {errors.area && <p className="text-danger">{errors.area.message}</p>}
          </div>

          <div className="col-span-2 gap-6 flex flex-col md:flex-row">
            <Checkbox
              {...register("hasSwimmingPool")}
              onChange={(e) => setValue("hasSwimmingPool", e.target.checked)}
            >
              Has Swimming Pool
            </Checkbox>

            <Checkbox
              {...register("hasGardenOrYard")}
              onChange={(e) => setValue("hasGardenOrYard", e.target.checked)}
            >
              Has Garden/Yard
            </Checkbox>

            <Checkbox
              {...register("hasBalconyOrPatio")}
              onChange={(e) => setValue("hasBalconyOrPatio", e.target.checked)}
            >
              Has Balcony/Patio
            </Checkbox>
          </div>
        </CardBody>

        <CardFooter className="flex justify-center gap-3">
          <Button
            color="primary"
            startContent={<ChevronLeftIcon className="w-4 h-4" />}
            onClick={onClickPrevious}
            className="w-36"
          >
            Previous
          </Button>
          <Button
            color="primary"
            endContent={<ChevronRightIcon className="w-4 h-4" />}
            onClick={async () => {
              const isValid = await trigger()
              isValid && onClickNext()
            }}
            className="w-36"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default FeatureForm