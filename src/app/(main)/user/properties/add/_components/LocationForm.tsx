import type { UpsertPropertyFormSchemaType } from '@/zodSchema/property.zod'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, cn, Input, Select, SelectItem, Textarea } from '@nextui-org/react'

import CountryList from 'country-list-with-dial-code-and-flag'

import { Controller, useFormContext } from 'react-hook-form'

interface LocationFormProps {
  onClickNext: () => void
  onClickPrevious: () => void
  className?: string
}

const COUNTRY_LIST = CountryList.getAll().map(country => ({ flag: country.flag, name: country.name, dialCode: country.dialCode }))

function LocationForm({ onClickNext, onClickPrevious, className }: LocationFormProps) {
  const { control, formState: { errors }, trigger, getValues } = useFormContext<UpsertPropertyFormSchemaType>()

  return (
    <div className={cn('container mx-auto p-4', className)}>
      <Card>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Controller
            control={control}
            name="location.country"
            render={({ field }) => (
              <Select
                {...field}
                label="Country"
                placeholder="Select Country"
                defaultSelectedKeys={[getValues('location.country')]}
                isInvalid={!!errors.location?.country}
                errorMessage={errors.location?.country?.message}
              >
                {COUNTRY_LIST.map(country => (
                  <SelectItem
                    key={country.name}
                    value={country.name}
                    className="min-w-40"
                  >
                    {`${country.flag} ${country.name}`}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="location.state"
            render={({ field }) => (
              <Input
                {...field}
                label="State"
                isInvalid={!!errors.location?.state}
                errorMessage={errors.location?.state?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="location.city"
            render={({ field }) => (
              <Input
                {...field}
                label="City"
                isInvalid={!!errors.location?.city}
                errorMessage={errors.location?.city?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="location.zip"
            render={({ field }) => (
              <Input
                {...field}
                label="ZIP Code"
                isInvalid={!!errors.location?.zip}
                errorMessage={errors.location?.zip?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="location.address"
            render={({ field }) => (
              <Input
                {...field}
                label="Address"
                isInvalid={!!errors.location?.address}
                errorMessage={errors.location?.address?.message}
                className="col-span-2"
              />
            )}
          />

          <Controller
            control={control}
            name="location.landmarks"
            render={({ field }) => (
              <Textarea
                {...field}
                label="Landmarks"
                isInvalid={!!errors.location?.landmarks}
                errorMessage={errors.location?.landmarks?.message}
                className="col-span-2"
              />
            )}
          />
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
              const isValid = await trigger(['location'])
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

export default LocationForm
