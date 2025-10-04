"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import PlanningStep from "./wizard-steps/planning-step"
import SizeStep from "./wizard-steps/size-step"
import TypeStep from "./wizard-steps/type-step"
import FinishStep from "./wizard-steps/finish-step"
import ExtrasStep from "./wizard-steps/extras-step"
import ReviewStep from "./wizard-steps/review-step"
import SavedPlansManager from "./saved-plans-manager"
import type { PoolPlanData } from "@/lib/types"
import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEY } from "@/lib/storage"

const steps = [
  { id: 1, name: "Planning", description: "Location & soil type" },
  { id: 2, name: "Size", description: "Dimensions & shape" },
  { id: 3, name: "Type", description: "Pool installation type" },
  { id: 4, name: "Finish", description: "Floor & surface finish" },
  { id: 5, name: "Extras", description: "Additional features" },
  { id: 6, name: "Review", description: "Final plan & export" },
]

export default function PoolPlannerWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const { toast } = useToast()
  const [poolData, setPoolData] = useState<PoolPlanData>({
    location: "",
    soilType: "",
    shape: "",
    size: "",
    customLength: 0,
    customWidth: 0,
    customDepth: 0,
    poolType: "",
    finish: "",
    extras: [],
  })

  useEffect(() => {
    const savedData = loadFromLocalStorage(STORAGE_KEY)
    if (savedData) {
      setPoolData(savedData)
      toast({
        title: "Progress Restored",
        description: "Your previous work has been loaded",
      })
    }
  }, [])

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEY, poolData)
  }, [poolData])

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updatePoolData = (data: Partial<PoolPlanData>) => {
    setPoolData({ ...poolData, ...data })
  }

  const loadPlan = (data: PoolPlanData) => {
    setPoolData(data)
    setCurrentStep(1)
  }

  const handleExport = () => {
    toast({
      title: "Exporting Your Plan",
      description: "Your complete pool building plan is being prepared...",
    })
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex justify-end">
        <SavedPlansManager currentData={poolData} onLoadPlan={loadPlan} />
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">{steps[currentStep - 1].name}</span>
        </div>
        <Progress value={progress} className="h-2" />

        {/* Step Indicators */}
        <div className="mt-6 hidden md:flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  currentStep > step.id
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.id
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-secondary text-secondary-foreground"
                }`}
              >
                {step.id}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-foreground">{step.name}</div>
                <div className="text-xs text-muted-foreground">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">{steps[currentStep - 1].name}</CardTitle>
          <CardDescription className="text-muted-foreground">{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && <PlanningStep data={poolData} updateData={updatePoolData} />}
          {currentStep === 2 && <SizeStep data={poolData} updateData={updatePoolData} />}
          {currentStep === 3 && <TypeStep data={poolData} updateData={updatePoolData} />}
          {currentStep === 4 && <FinishStep data={poolData} updateData={updatePoolData} />}
          {currentStep === 5 && <ExtrasStep data={poolData} updateData={updatePoolData} />}
          {currentStep === 6 && <ReviewStep data={poolData} />}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="text-foreground bg-transparent"
            >
              Back
            </Button>
            {currentStep < steps.length ? (
              <Button
                onClick={handleNext}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                type="button"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleExport}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                type="button"
              >
                Export Plan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
