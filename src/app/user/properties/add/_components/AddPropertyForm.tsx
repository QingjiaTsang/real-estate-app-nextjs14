'use client'
import { useState } from "react"

import Stepper from "@/app/user/properties/add/_components/Stepper"
import BasicForm, { BasicFormProps } from "@/app/user/properties/add/_components/BasicForm"
import { cn } from "@nextui-org/react"

type AddPropertyFormProps = Omit<BasicFormProps, "onClickNext" | "className">

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
  const [currentStep, setCurrentStep] = useState(0)

  const onClickNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onClickPrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  return (
    <div>
      <Stepper stepItemList={stepItemList} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <form>
        <BasicForm
          className={cn({ "hidden": currentStep !== 0 })}
          statusList={statusList}
          typeList={typeList}
          onClickNext={onClickNext}
        />
      </form>
    </div>
  )
}

export default AddPropertyForm