"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import type { PoolPlanData } from "@/lib/types"
import { MapPin, Mountain } from "lucide-react"
import AIRecommendations from "@/components/ai-recommendations"

interface PlanningStepProps {
  data: PoolPlanData
  updateData: (data: Partial<PoolPlanData>) => void
}

export default function PlanningStep({ data, updateData }: PlanningStepProps) {
  return (
    <div className="space-y-8">
      {/* Location */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <Label className="text-lg font-semibold text-foreground">Pool Location</Label>
        </div>
        <RadioGroup value={data.location} onValueChange={(value) => updateData({ location: value })}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Backyard", "Front Yard", "Side Yard", "Rooftop"].map((location) => (
              <Card
                key={location}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${
                  data.location === location ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => updateData({ location })}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={location} id={location} />
                  <Label htmlFor={location} className="cursor-pointer text-foreground font-medium">
                    {location}
                  </Label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Soil Type */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Mountain className="w-5 h-5 text-primary" />
          <Label className="text-lg font-semibold text-foreground">Soil Type</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Soil type affects excavation difficulty and foundation requirements
        </p>
        <RadioGroup value={data.soilType} onValueChange={(value) => updateData({ soilType: value })}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Clay", desc: "Dense, holds water well" },
              { name: "Sandy", desc: "Easy to dig, good drainage" },
              { name: "Rocky", desc: "Difficult excavation" },
              { name: "Loamy", desc: "Balanced, ideal soil" },
            ].map((soil) => (
              <Card
                key={soil.name}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${
                  data.soilType === soil.name ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => updateData({ soilType: soil.name })}
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value={soil.name} id={soil.name} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={soil.name} className="cursor-pointer text-foreground font-medium">
                      {soil.name}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">{soil.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {(data.location || data.soilType) && <AIRecommendations data={data} />}
    </div>
  )
}
