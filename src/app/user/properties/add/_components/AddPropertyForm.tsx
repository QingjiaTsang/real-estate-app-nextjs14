'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@nextui-org/react"

import Stepper from "@/app/user/properties/add/_components/Stepper"
import BasicForm, { BasicFormProps } from "@/app/user/properties/add/_components/BasicForm"
import LocationForm from "@/app/user/properties/add/_components/LocationForm"
import FeatureForm from "@/app/user/properties/add/_components/FeatureForm"
import PictureForm from "@/app/user/properties/add/_components/PictureForm"
import ContactForm from "@/app/user/properties/add/_components/ContactForm"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { addProperty } from "@/libs/actions/property"
import { useAction } from "next-safe-action/hooks"
import { toast } from "react-toastify"
import { addPropertyFormSchema, AddPropertyFormSchema } from "@/zodSchema/property.zod"
import { uploadPropertyPictures } from "@/libs/upload"


type AddPropertyFormProps =
  Omit<BasicFormProps, "onClickNext" | "className">

const stepItemList = [
  {
    label: "Basic",
  },
  {
    label: "Location",
  },
  {
    label: "Features",
  },
  {
    label: "Pictures",
  },
  {
    label: "Contact",
  },
]

const AddPropertyForm = ({ statusList, typeList }: AddPropertyFormProps) => {
  const router = useRouter()

  const { execute: addPropertyAction, isExecuting, result } = useAction(addProperty, {
    onSuccess: () => {
      toast.success("Property added")
      router.push("/user/properties")
    },
    onError: (error) => {
      console.log("error from addPropertyAction", error)
      toast.error("Failed to add property")
    }
  })

  const methods = useForm<AddPropertyFormSchema>({
    resolver: zodResolver(addPropertyFormSchema),
    defaultValues: {
      basic: {
        name: "",
        description: "",
        typeId: "",
        statusId: "",
        price: "",
      },
      location: {
        address: "",
        city: "",
        state: "",
        zip: "",
        landmarks: "",
        country: "",
      },
      features: {
        bedrooms: "",
        bathrooms: "",
        parkingSpots: "",
        area: "",
        hasSwimmingPool: false,
        hasGardenOrYard: false,
        hasBalconyOrPatio: false,
      },
      pictures: [],
      contact: {
        name: "",
        email: "",
        phone: "",
      },
    },
  })

  const [currentStep, setCurrentStep] = useState(0)

  const onClickNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onClickPrevious = () => {
    setCurrentStep(prev => prev - 1)
  }


  const onSubmit = async (data: AddPropertyFormSchema) => {
    const pictureUrls = await uploadPropertyPictures(data.pictures)

    if (!pictureUrls) {
      toast.error("Failed to upload pictures! Please try again.")
      return
    }

    addPropertyAction({
      ...data,
      pictures: pictureUrls,
    })
  }

  return (
    <div>
      <Stepper stepItemList={stepItemList} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, (errors) => {
          console.error("errors", errors)
        })}>
          <BasicForm
            className={cn({ "hidden": currentStep !== 0 })}
            statusList={statusList}
            typeList={typeList}
            onClickNext={onClickNext}
          />
          <LocationForm
            className={cn({ "hidden": currentStep !== 1 })}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
          />
          <FeatureForm
            className={cn({ "hidden": currentStep !== 2 })}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
          />
          <PictureForm
            className={cn({ "hidden": currentStep !== 3 })}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
          />
          <ContactForm
            className={cn({ "hidden": currentStep !== 4 })}
            onClickPrevious={onClickPrevious}
            isLoading={methods.formState.isSubmitting || isExecuting}
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default AddPropertyForm