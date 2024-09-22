import React, { useEffect, useState } from 'react'

import { Button, Card, CardBody, CardFooter, cn } from "@nextui-org/react"
import { ChevronLeftIcon, ChevronRightIcon, XCircleIcon } from "@heroicons/react/24/outline"
import FileInput from "@/app/components/FileInput"
import Image from 'next/image'

export type PictureFormProps = {
  onClickNext: () => void
  onClickPrevious: () => void
  className?: string
}

const PictureForm = ({ onClickNext, onClickPrevious, className }: PictureFormProps) => {
  const [images, setImages] = useState<(File | undefined)[]>([])


  const handleDeleteImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }


  return (
    <div className={cn("container mx-auto p-4", className)}>
      <Card>
        <CardBody>
          <FileInput
            lablText="Upload Property Images"
            accept="image/*"
            image={images[images.length - 1]}
            onChange={(e) => setImages(prev => [...prev, e?.target?.files?.[0]])}
          />
          <div className="flex my-2 gap-2 flex-wrap">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <Image
                  src={URL.createObjectURL(image!)}
                  alt="Property Image"
                  width={300}
                  height={300}
                  className="object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white rounded-full p-1"
                  onClick={() => handleDeleteImage(index)}
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
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
            onClick={onClickNext}
            endContent={<ChevronRightIcon className="h-4 w-4" />}
            className="w-36"
            isDisabled={images.length === 0}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PictureForm