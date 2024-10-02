'use client'
import type { UpsertPropertyFormSchemaType } from '@/zodSchema/property.zod'

import type { Prisma, PropertyPicture, PropertyStatus, PropertyType } from '@prisma/client'
import BasicForm from '@/app/user/properties/add/_components/BasicForm'
import ContactForm from '@/app/user/properties/add/_components/ContactForm'

import FeatureForm from '@/app/user/properties/add/_components/FeatureForm'
import LocationForm from '@/app/user/properties/add/_components/LocationForm'
import PictureForm from '@/app/user/properties/add/_components/PictureForm'
import Stepper from '@/app/user/properties/add/_components/Stepper'
import { upsertProperty } from '@/libs/actions/property'
import { uploadPropertyPictures } from '@/libs/upload'
import { upsertPropertyFormSchema } from '@/zodSchema/property.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@nextui-org/react'

import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'


interface UpsertPropertyFormProps {
  statusList: PropertyStatus[]
  typeList: PropertyType[]
  propertyId?: string
  propertyToEdit?: Omit<Prisma.PropertyGetPayload<{
    include: {
      user: true
      location: true
      feature: true
      contact: true
      type: true
      status: true
      pictures: true
    }
  }>, 'price'> & {
    // Note:
    // to handle the warning: "Warning: Only plain objects can be passed to Client Components from Server Components. Decimal objects are not supported."
    // which is caused by the price field with type Decimal(not supported by JS) in the propertyToEdit
    price: string
  }
}

const STEP_ITEM_LIST = [
  {
    label: 'Basic',
  },
  {
    label: 'Location',
  },
  {
    label: 'Features',
  },
  {
    label: 'Pictures',
  },
  {
    label: 'Contact',
  },
]

function UpsertPropertyForm({ statusList, typeList, propertyId, propertyToEdit }: UpsertPropertyFormProps) {
  const router = useRouter()

  const { execute: upsertPropertyAction, isExecuting } = useAction(upsertProperty, {
    onSuccess: () => {
      toast.success('Property added')
      router.push('/user/properties')
    },
    onError: (error) => {
      console.log('error from addPropertyAction', error)
      toast.error('Failed to add property')
    },
  })

  const methods = useForm<UpsertPropertyFormSchemaType>({
    resolver: zodResolver(upsertPropertyFormSchema),
    defaultValues: {
      basic: {
        name: propertyToEdit?.name ?? '',
        description: propertyToEdit?.description ?? '',
        typeId: propertyToEdit?.type?.id ?? '',
        statusId: propertyToEdit?.status?.id ?? '',
        price: propertyToEdit?.price?.toString() ?? '',
      },
      location: {
        address: propertyToEdit?.location?.address ?? '',
        city: propertyToEdit?.location?.city ?? '',
        state: propertyToEdit?.location?.state ?? '',
        zip: propertyToEdit?.location?.zip ?? '',
        landmarks: propertyToEdit?.location?.landmarks ?? '',
        country: propertyToEdit?.location?.country ?? '',
      },
      features: {
        bedrooms: propertyToEdit?.feature?.bedrooms?.toString() ?? '',
        bathrooms: propertyToEdit?.feature?.bathrooms?.toString() ?? '',
        parkingSpots: propertyToEdit?.feature?.parkingSpots?.toString() ?? '',
        area: propertyToEdit?.feature?.area?.toString() ?? '',
        hasSwimmingPool: propertyToEdit?.feature?.hasSwimmingPool ?? false,
        hasGardenOrYard: propertyToEdit?.feature?.hasGardenOrYard ?? false,
        hasBalconyOrPatio: propertyToEdit?.feature?.hasBalconyOrPatio ?? false,
      },
      contact: {
        name: propertyToEdit?.contact?.name ?? '',
        email: propertyToEdit?.contact?.email ?? '',
        phone: propertyToEdit?.contact?.phone ?? '',
      },
    },
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [imagesToUpload, setImagesToUpload] = useState<File[]>([])
  const [dbPictures, setDbPictures] = useState<{
    existedPictures: PropertyPicture[]
    toDeleteIds: string[]
  }>({
    existedPictures: propertyToEdit?.pictures ?? [],
    toDeleteIds: [],
  })

  const onClickNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onClickPrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const onDeleteExistedPicture = (picture: PropertyPicture) => {
    setDbPictures(prev => ({
      existedPictures: prev.existedPictures.filter(p => p.id !== picture.id),
      toDeleteIds: [...prev.toDeleteIds, picture.id],
    }))
  }

  const onSubmit = async (data: UpsertPropertyFormSchemaType) => {
    const pictureUrls = await uploadPropertyPictures(imagesToUpload)

    if (!pictureUrls) {
      toast.error('Failed to upload pictures! Please try again.')
      return
    }

    upsertPropertyAction({
      ...data,
      ownerId: propertyToEdit?.user.id ?? '',
      pictures: pictureUrls,
      id: propertyId,
      pictureIdsToDelete: dbPictures.toDeleteIds,
    })
  }

  return (
    <div>
      <Stepper stepItemList={STEP_ITEM_LIST} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, (errors) => {
          console.error('errors', errors)
        })}
        >
          <BasicForm
            className={cn({ hidden: currentStep !== 0 })}
            statusList={statusList}
            typeList={typeList}
            onClickNext={onClickNext}
          />
          <LocationForm
            className={cn({ hidden: currentStep !== 1 })}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
          />
          <FeatureForm
            className={cn({ hidden: currentStep !== 2 })}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
          />
          <PictureForm
            className={cn({ hidden: currentStep !== 3 })}
            imagesToUpload={imagesToUpload}
            setImagesToUpload={setImagesToUpload}
            existedPictures={dbPictures.existedPictures}
            onDeleteExistedPicture={onDeleteExistedPicture}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
          />
          <ContactForm
            className={cn({ hidden: currentStep !== 4 })}
            onClickPrevious={onClickPrevious}
            isLoading={methods.formState.isSubmitting || isExecuting}
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default UpsertPropertyForm
