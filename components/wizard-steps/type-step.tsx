"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import type { PoolPlanData } from "@/lib/types"
import { Layers } from "lucide-react"

interface TypeStepProps {
  data: PoolPlanData
  updateData: (data: Partial<PoolPlanData>) => void
}

export default function TypeStep({ data, updateData }: TypeStepProps) {
  const poolTypes = [
    {
      name: "In-Ground",
      desc: "Permanent installation, dug into the ground",
      pros: "Most durable, adds property value",
      difficulty: "Advanced",
    },
    {
      name: "Above-Ground",
      desc: "Sits on top of ground surface",
      pros: "Easier installation, lower cost",
      difficulty: "Beginner",
    },
    {
      name: "Semi-In-Ground",
      desc: "Partially buried in the ground",
      pros: "Balance of cost and aesthetics",
      difficulty: "Intermediate",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Layers className="w-5 h-5 text-primary" />
        <Label className="text-lg font-semibold text-foreground">Pool Installation Type</Label>
      </div>

      <RadioGroup value={data.poolType} onValueChange={(value) => updateData({ poolType: value })}>
        <div className="grid grid-cols-1 gap-4">
          {poolTypes.map((type) => (
            <Card
              key={type.name}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${
                data.poolType === type.name ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => updateData({ poolType: type.name })}
            >
              <div className="flex items-start space-x-4">
                <RadioGroupItem value={type.name} id={type.name} className="mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={type.name} className="cursor-pointer text-foreground font-semibold text-lg">
                      {type.name}
                    </Label>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        type.difficulty === "Beginner"
                          ? "bg-chart-3/20 text-chart-3"
                          : type.difficulty === "Intermediate"
                            ? "bg-chart-2/20 text-chart-2"
                            : "bg-chart-1/20 text-chart-1"
                      }`}
                    >
                      {type.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                  <p className="text-sm text-foreground">
                    <span className="text-primary font-medium">Benefits:</span> {type.pros}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
