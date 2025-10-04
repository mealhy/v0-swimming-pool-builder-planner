"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import type { PoolPlanData } from "@/lib/types"
import { Paintbrush } from "lucide-react"

interface FinishStepProps {
  data: PoolPlanData
  updateData: (data: Partial<PoolPlanData>) => void
}

export default function FinishStep({ data, updateData }: FinishStepProps) {
  const finishes = [
    {
      name: "Vinyl Liner",
      desc: "Smooth, comfortable surface",
      cost: "$",
      maintenance: "Replace every 7-10 years",
    },
    {
      name: "Fiberglass",
      desc: "Pre-molded shell, quick install",
      cost: "$$",
      maintenance: "Low maintenance, durable",
    },
    {
      name: "Concrete/Gunite",
      desc: "Fully customizable, permanent",
      cost: "$$$",
      maintenance: "Requires regular resurfacing",
    },
    {
      name: "Tile",
      desc: "Premium finish, beautiful aesthetics",
      cost: "$$$$",
      maintenance: "Long-lasting, easy to clean",
    },
    {
      name: "Pebble",
      desc: "Natural look, slip-resistant",
      cost: "$$$",
      maintenance: "Very durable, 15-20 years",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Paintbrush className="w-5 h-5 text-primary" />
        <Label className="text-lg font-semibold text-foreground">Pool Finish & Surface</Label>
      </div>

      <RadioGroup value={data.finish} onValueChange={(value) => updateData({ finish: value })}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {finishes.map((finish) => (
            <Card
              key={finish.name}
              className={`p-5 cursor-pointer transition-all hover:border-primary ${
                data.finish === finish.name ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => updateData({ finish: finish.name })}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={finish.name} id={finish.name} className="mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={finish.name} className="cursor-pointer text-foreground font-semibold">
                      {finish.name}
                    </Label>
                    <span className="text-primary font-mono text-sm">{finish.cost}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{finish.desc}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-foreground font-medium">Maintenance:</span> {finish.maintenance}
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
