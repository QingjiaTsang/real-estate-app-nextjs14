import React from "react"

import { Button, Card, CardBody, CardFooter, cn, Input, Select, SelectItem, Textarea } from "@nextui-org/react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

import CountryList from 'country-list-with-dial-code-and-flag'


const locationFormSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip: z.string().min(1, { message: "ZIP code is required" }),
  landmarks: z.string().min(1, { message: "Landmark is required" }),
  country: z.string().min(1, { message: "Country is required" }),
})

type LocationFormSchema = z.infer<typeof locationFormSchema>

export type LocationFormProps = {
  onClickNext: () => void
  onClickPrevious: () => void
  className?: string
}

const COUNTRY_LIST = CountryList.getAll().map((country) => ({ flag: country.flag, name: country.name, dialCode: country.dialCode }))

const LocationForm = ({ onClickNext, onClickPrevious, className }: LocationFormProps) => {
  const { register, formState: { errors }, trigger } = useForm<LocationFormSchema>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zip: "",
      landmarks: "",
      country: "",
    },
  })

  return (
    <div className={cn("container mx-auto p-4", className)}>
      <Card>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Select {...register("country")} label="Country" >
              {COUNTRY_LIST.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {`${country.flag} ${country.name}`}
                </SelectItem>
              ))}
            </Select>
            {errors.country && <p className="text-danger">{errors.country.message}</p>}
          </div>

          <div>
            <Input {...register("state")} label="State" />
            {errors.state && <p className="text-danger">{errors.state.message}</p>}
          </div>

          <div>
            <Input {...register("city")} label="City" />
            {errors.city && <p className="text-danger">{errors.city.message}</p>}
          </div>

          <div>
            <Input {...register("zip")} label="ZIP Code" />
            {errors.zip && <p className="text-danger">{errors.zip.message}</p>}
          </div>

          <div className="col-span-2">
            <Input {...register("address")} label="Address" />
            {errors.address && <p className="text-danger">{errors.address.message}</p>}
          </div>

          <div className="col-span-2">
            <Textarea {...register("landmarks")} label="Landmarks" />
            {errors.landmarks && <p className="text-danger">{errors.landmarks.message}</p>}
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

export default LocationForm