import React from "react";

import { cn } from "@nextui-org/react";


type StepperProps = {
  stepItemList: { label: string }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}


const Stepper = ({ stepItemList, currentStep, setCurrentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-around m-4 mb-2">
      {stepItemList.map((stepItem, index) => {
        return (
          <React.Fragment key={stepItem.label}>
            <div
              className={cn("flex flex-col items-center justify-center gap-1", {
                "text-gray-500": currentStep < index,
                "text-primary-400": currentStep === index,
                "text-primary-600": currentStep > index,
                "cursor-pointer": currentStep >= index,
              })}
              {...(currentStep >= index && { onClick: () => setCurrentStep(index) })}
            >
              <div
                className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white", {
                  "bg-gray-300": currentStep < index,
                  "bg-primary-400": currentStep === index,
                  "bg-primary-600": currentStep > index,
                })}
              >
                {index + 1}
              </div>
              <div>
                {stepItem.label}
              </div>
            </div>
            {
              index !== stepItemList.length - 1 && (
                <div
                  className={cn(
                    "border border-gray-200 w-full mb-6 relative",
                    "after:absolute after:top-0 after:left-0 after:border after:transition-all after:duration-300 after:ease-in",
                    {
                      "after:border-primary-600 after:w-full": currentStep > index,
                      "after:w-0": currentStep <= index,
                    })}
                ></div>
              )
            }
          </React.Fragment>
        )
      })}

    </div>
  )
}

export default Stepper