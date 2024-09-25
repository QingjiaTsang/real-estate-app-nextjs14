import { useState } from 'react'

import { Button, Card, CardBody, CardFooter, cn, Image } from "@nextui-org/react"
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline"
import FileInput from "@/app/components/FileInput"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useFormContext } from "react-hook-form"
import { AddPropertyFormSchema } from "@/zodSchema/property.zod"


type PictureFormProps = {
  onClickNext: () => void
  onClickPrevious: () => void
  className?: string
}

const PictureForm = ({ onClickNext, onClickPrevious, className }: PictureFormProps) => {
  const { formState: { errors }, setValue, trigger } = useFormContext<AddPropertyFormSchema>()
  const [images, setImages] = useState<File[]>([])

  const handleDeleteImage = (index: number) => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index)
      setValue("pictures", newImages)
      return newImages
    })
  }

  const handleAddImage = (file: File) => {
    setImages(prev => {
      const newImages = [...prev, file]
      setValue("pictures", newImages)
      return newImages
    })
  }

  return (
    <div className={cn("container mx-auto p-4", className)}>
      <Card>
        <CardBody>
          <FileInput
            lablText="Upload Property Images"
            accept="image/*"
            image={images[images.length - 1]}
            onChange={(e) => handleAddImage(e?.target?.files?.[0]!)}
          />
          <div className="flex my-2 gap-2 flex-wrap">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <Zoom>
                  <Image
                    src={URL.createObjectURL(image!)}
                    alt="Property Image"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </Zoom>
                <button
                  type="button"
                  className="z-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-danger rounded-full p-1"
                  onClick={() => handleDeleteImage(index)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          {errors.pictures && <p className="text-danger">{errors.pictures.message}</p>}
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
            onClick={async () => {
              const isValid = await trigger(["pictures"])
              isValid && onClickNext()
            }}
            endContent={<ChevronRightIcon className="h-4 w-4" />}
            className="w-36"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PictureForm