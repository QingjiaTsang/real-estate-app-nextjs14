import { PropertyStatus, PropertyType } from "@prisma/client"

import { Button, Card, CardBody, CardFooter, cn, Input, Select, SelectItem, Textarea } from "@nextui-org/react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const basicFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  typeId: z.string().min(1, { message: "Type is required" }),
  statusId: z.string().min(1, { message: "Status is required" }),
  price: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, { message: "Price must be a positive number" }),
})

type BasicFormSchema = z.infer<typeof basicFormSchema>

export type BasicFormProps = {
  statusList: PropertyStatus[]
  typeList: PropertyType[]
  onClickNext: () => void
  className?: string
}

const BasicForm = ({ statusList, typeList, onClickNext, className }: BasicFormProps) => {

  const { register, formState: { errors }, trigger } = useForm<BasicFormSchema>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      name: "",
      description: "",
      typeId: "",
      statusId: "",
      price: 0,
    },
  })

  return (
    <div className={cn("container mx-auto p-4", className)}>
      <Card>
        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="col-span-3">
            <Input {...register("name")} label="Name" />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="col-span-3">
            <Textarea {...register("description")} label="Description" />
            {errors.description && <p className="text-danger">{errors.description.message}</p>}
          </div>

          <div className="col-span-3 md:col-span-1">
            <Select {...register("typeId")} label="Type">
              {typeList.map((type) => (
                <SelectItem key={type.id} value={type.id}>{type.value}</SelectItem>
              ))}
            </Select>
            {errors.typeId && <p className="text-danger">{errors.typeId.message}</p>}
          </div>

          <div className="col-span-3 md:col-span-1">
            <Select {...register("statusId")} label="Status">
              {statusList.map((status) => (
                <SelectItem key={status.id} value={status.id}>{status.value}</SelectItem>
              ))}
            </Select>
            {errors.statusId && <p className="text-danger">{errors.statusId.message}</p>}
          </div>

          <div className="col-span-3 md:col-span-1">
            <Input {...register("price")} label="Price" />
            {errors.price && <p className="text-danger">{errors.price.message}</p>}
          </div>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button
            isDisabled
            color="primary"
            startContent={<ChevronLeftIcon className="w-4 h-4" />}
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
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default BasicForm