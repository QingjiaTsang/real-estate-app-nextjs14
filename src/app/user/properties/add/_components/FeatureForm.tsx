import { Button, Card, CardBody, CardFooter, cn, Input, Checkbox } from "@nextui-org/react"

import { Controller, useFormContext } from "react-hook-form"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

import { AddPropertyFormSchema } from "@/zodSchema/property.zod"


type FeatureFormProps = {
  onClickNext: () => void
  onClickPrevious: () => void
  className?: string
}

const FeatureForm = ({ onClickNext, onClickPrevious, className }: FeatureFormProps) => {
  const { control, formState: { errors }, trigger } = useFormContext<AddPropertyFormSchema>()

  return (
    <div className={cn("container mx-auto p-4", className)}>
      <Card>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Controller
            control={control}
            name="features.bedrooms"
            render={({ field }) => (
              <Input
                {...field}
                label="Bedrooms"
                isInvalid={!!errors.features?.bedrooms}
                errorMessage={errors.features?.bedrooms?.message}
                className="col-span-2 md:col-span-1"
              />
            )}
          />

          <Controller
            control={control}
            name="features.bathrooms"
            render={({ field }) => (
              <Input
                {...field}
                label="Bathrooms"
                isInvalid={!!errors.features?.bathrooms}
                errorMessage={errors.features?.bathrooms?.message}
                className="col-span-2 md:col-span-1"
              />
            )}
          />

          <Controller
            control={control}
            name="features.parkingSpots"
            render={({ field }) => (
              <Input
                {...field}
                label="Parking Spots"
                isInvalid={!!errors.features?.parkingSpots}
                errorMessage={errors.features?.parkingSpots?.message}
                className="col-span-2 md:col-span-1"
              />
            )}
          />

          <Controller
            control={control}
            name="features.area"
            render={({ field }) => (
              <Input
                {...field}
                label="Area (sq ft)"
                isInvalid={!!errors.features?.area}
                errorMessage={errors.features?.area?.message}
                className="col-span-2 md:col-span-1"
              />
            )}
          />

          <div className="col-span-2 gap-6 flex flex-col md:flex-row">
            <Controller
              control={control}
              name="features.hasSwimmingPool"
              render={({ field }) => (
                <Checkbox onChange={field.onChange} onBlur={field.onBlur} >
                  Has Swimming Pool
                </Checkbox>
              )}
            />

            <Controller
              control={control}
              name="features.hasGardenOrYard"
              render={({ field }) => (
                <Checkbox onChange={field.onChange} onBlur={field.onBlur} >
                  Has Garden/Yard
                </Checkbox>
              )}
            />

            <Controller
              control={control}
              name="features.hasBalconyOrPatio"
              render={({ field }) => (
                <Checkbox onChange={field.onChange} onBlur={field.onBlur} >
                  Has Balcony/Patio
                </Checkbox>
              )}
            />
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
              const isValid = await trigger(["features"])
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