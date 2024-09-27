import { PropertyPicture } from '@prisma/client'

import { useState } from 'react'

import { Button, Card, CardBody, CardFooter, cn, Image } from "@nextui-org/react"
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline"
import FileInput from "@/app/components/FileInput"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useFormContext } from "react-hook-form"
import { UpsertPropertyFormSchemaType } from "@/zodSchema/property.zod"


type PictureFormProps = {
  imagesToUpload: File[]
  setImagesToUpload: React.Dispatch<React.SetStateAction<File[]>>
  existedPictures: PropertyPicture[]
  onDeleteExistedPicture: (picture: PropertyPicture) => void
  onClickNext: () => void
  onClickPrevious: () => void
  className?: string
}

const PictureForm = ({ imagesToUpload, setImagesToUpload, existedPictures, onDeleteExistedPicture, onClickNext, onClickPrevious, className }: PictureFormProps) => {

  const handleDeleteImage = (index: number) => {
    setImagesToUpload(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddImage = (file: File) => {
    setImagesToUpload(prev => [...prev, file])
  }

  return (
    <div className={cn("container mx-auto p-4", className)}>
      <Card>
        <CardBody>
          <FileInput
            lablText="Upload Property Images"
            accept="image/*"
            image={imagesToUpload[imagesToUpload.length - 1]}
            onChange={(e) => handleAddImage(e?.target?.files?.[0]!)}
          />
          <div className="flex my-2 gap-2 flex-wrap">
            {existedPictures.map((picture) => (
              <div key={picture.id} className="relative group">
                <Zoom>
                  <Image
                    src={picture.url}
                    alt="Property Image"
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </Zoom>
                <button
                  type="button"
                  className="z-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-danger rounded-full p-1"
                  onClick={() => onDeleteExistedPicture(picture)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
            {imagesToUpload.map((image, index) => (
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
          {(imagesToUpload.length === 0 && existedPictures.length === 0)
            && <p className="text-danger">At least one picture is required</p>}
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
            isDisabled={existedPictures.length === 0 && imagesToUpload.length === 0}
            onClick={onClickNext}
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