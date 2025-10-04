"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import type { PoolPlanData } from "@/lib/types"
import { Sparkles } from "lucide-react"

interface ExtrasStepProps {
  data: PoolPlanData
  updateData: (data: Partial<PoolPlanData>) => void
}

export default function ExtrasStep({ data, updateData }: ExtrasStepProps) {
  const extras = [
    { name: "LED Pool Lights", desc: "Color-changing underwater lighting", cost: "$300-800" },
    { name: "Pool Deck", desc: "Surrounding patio area", cost: "$3,000-10,000" },
    { name: "Heating System", desc: "Extend swimming season", cost: "$2,000-5,000" },
    { name: "Water Jets", desc: "Massage and exercise features", cost: "$500-2,000" },
    { name: "Pool Cover", desc: "Safety and heat retention", cost: "$400-1,500" },
    { name: "Diving Board", desc: "Fun diving feature", cost: "$300-1,000" },
    { name: "Slide", desc: "Water slide for entertainment", cost: "$1,000-5,000" },
    { name: "Waterfall Feature", desc: "Decorative water feature", cost: "$1,500-5,000" },
    { name: "Saltwater System", desc: "Alternative to chlorine", cost: "$1,500-2,500" },
    { name: "Pool Fence", desc: "Safety barrier (often required)", cost: "$1,500-4,000" },
  ]

  const toggleExtra = (extraName: string) => {
    const currentExtras = data.extras || []
    const newExtras = currentExtras.includes(extraName)
      ? currentExtras.filter((e) => e !== extraName)
      : [...currentExtras, extraName]
    updateData({ extras: newExtras })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <Label className="text-lg font-semibold text-foreground">Additional Features & Extras</Label>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Select all features you want to include in your pool project</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {extras.map((extra) => (
          <Card
            key={extra.name}
            className={`p-4 cursor-pointer transition-all hover:border-primary ${
              data.extras?.includes(extra.name) ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => toggleExtra(extra.name)}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                id={extra.name}
                checked={data.extras?.includes(extra.name)}
                onCheckedChange={() => toggleExtra(extra.name)}
              />
              <div className="flex-1 space-y-1">
                <Label htmlFor={extra.name} className="cursor-pointer text-foreground font-medium">
                  {extra.name}
                </Label>
                <p className="text-xs text-muted-foreground">{extra.desc}</p>
                <p className="text-sm text-primary font-mono">{extra.cost}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
