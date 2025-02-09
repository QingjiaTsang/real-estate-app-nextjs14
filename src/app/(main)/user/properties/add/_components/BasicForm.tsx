import type { UpsertPropertyFormSchemaType } from '@/zodSchema/property.zod'

import type { PropertyStatus, PropertyType } from '@prisma/client'

import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, cn, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'

interface BasicFormProps {
  statusList: PropertyStatus[]
  typeList: PropertyType[]
  onClickNext: () => void
  className?: string
}

function BasicForm({ statusList, typeList, onClickNext, className }: BasicFormProps) {
  const { control, formState: { errors }, trigger, getValues } = useFormContext<UpsertPropertyFormSchemaType>()

  return (
    <div className={cn('container mx-auto p-4', className)}>
      <Card>
        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Controller
            control={control}
            name="basic.name"
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                isInvalid={!!errors.basic?.name}
                errorMessage={errors.basic?.name?.message}
                className="col-span-3"
              />
            )}
          />

          <Controller
            control={control}
            name="basic.description"
            render={({ field }) => (
              <Textarea
                {...field}
                label="Description"
                isInvalid={!!errors.basic?.description}
                errorMessage={errors.basic?.description?.message}
                className="col-span-3"
              />
            )}
          />

          <Controller
            control={control}
            name="basic.typeId"
            render={({ field }) => (
              <Select
                {...field}
                label="Type"
                defaultSelectedKeys={[getValues('basic.typeId')]}
                placeholder="Select Type"
                isInvalid={!!errors.basic?.typeId}
                errorMessage={errors.basic?.typeId?.message}
                className="col-span-3 md:col-span-1"
              >
                {typeList.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.value}</SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="basic.statusId"
            render={({ field }) => (
              <Select
                {...field}
                label="Status"
                defaultSelectedKeys={[getValues('basic.statusId')]}
                placeholder="Select Status"
                isInvalid={!!errors.basic?.statusId}
                errorMessage={errors.basic?.statusId?.message}
                className="col-span-3 md:col-span-1"
              >
                {statusList.map(status => (
                  <SelectItem key={status.id} value={status.id}>{status.value}</SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="basic.price"
            render={({ field }) => (
              <Input
                {...field}
                label="Price"
                startContent={<CurrencyDollarIcon className="w-4 h-4 mb-0.5" />}
                isInvalid={!!errors.basic?.price}
                errorMessage={errors.basic?.price?.message}
                className="col-span-3 md:col-span-1"
              />
            )}
          />
        </CardBody>

        <CardFooter className="flex justify-center gap-3">
          <Button
            isDisabled
            color="primary"
            startContent={<ChevronLeftIcon className="w-4 h-4" />}
            className="w-36"
          >
            Previous
          </Button>
          <Button
            color="primary"
            endContent={<ChevronRightIcon className="w-4 h-4" />}
            onClick={async () => {
              const isValid = await trigger(['basic'])
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

export default BasicForm
