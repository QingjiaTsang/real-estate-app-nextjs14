import { UpsertPropertyFormSchemaType } from "@/zodSchema/property.zod"

import { Button, Card, CardBody, CardFooter, cn, Input } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/solid'

type ContactFormProps = {
  isLoading: boolean
  onClickPrevious: () => void
  className?: string
}

const ContactForm = ({ isLoading, onClickPrevious, className }: ContactFormProps) => {
  const { control, formState: { errors } } = useFormContext<UpsertPropertyFormSchemaType>()

  return (
    <div className={cn("container mx-auto p-4", className)}>
      <Card>
        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Controller
            control={control}
            name="contact.name"
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                isInvalid={!!errors.contact?.name}
                errorMessage={errors.contact?.name?.message}
                className="col-span-3 md:col-span-1"
              />
            )}
          />

          <Controller
            control={control}
            name="contact.phone"
            render={({ field }) => (
              <Input
                {...field}
                label="Phone"
                isInvalid={!!errors.contact?.phone}
                errorMessage={errors.contact?.phone?.message}
                className="col-span-3 md:col-span-1"
              />
            )}
          />

          <Controller
            control={control}
            name="contact.email"
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                isInvalid={!!errors.contact?.email}
                errorMessage={errors.contact?.email?.message}
                className="col-span-3 md:col-span-1"
              />
            )}
          />
        </CardBody>

        <CardFooter className="flex justify-center gap-3">
          <Button
            color="primary"
            onClick={onClickPrevious}
            startContent={<ChevronLeftIcon className="h-4 w-4" />}
            className="w-36"
          >
            Previous
          </Button>
          <Button
            color="primary"
            type='submit'
            endContent={<PlusIcon className="h-4 w-4" />}
            className="w-36"
            isLoading={isLoading}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ContactForm
