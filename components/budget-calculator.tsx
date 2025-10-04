"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import type { PoolPlanData } from "@/lib/types"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { useState } from "react"

interface BudgetCalculatorProps {
  data: PoolPlanData
}

export default function BudgetCalculator({ data }: BudgetCalculatorProps) {
  const [laborMultiplier, setLaborMultiplier] = useState(1)
  const [materialsMultiplier, setMaterialsMultiplier] = useState(1)
  const [extrasMultiplier, setExtrasMultiplier] = useState(1)

  // Calculate base cost based on pool type and size
  const getBaseCost = () => {
    let sizeFactor = 1
    if (data.size === "Small") sizeFactor = 0.7
    else if (data.size === "Medium") sizeFactor = 1
    else if (data.size === "Large") sizeFactor = 1.5
    else if (data.size === "Custom") {
      const area = data.customLength * data.customWidth
      sizeFactor = area / 450 // 450 sq ft is medium baseline
    }

    let basePrice = 0
    if (data.poolType === "Above-Ground") basePrice = 5000
    else if (data.poolType === "Semi-In-Ground") basePrice = 15000
    else if (data.poolType === "In-Ground") basePrice = 30000

    return basePrice * sizeFactor * materialsMultiplier
  }

  // Calculate finish cost
  const getFinishCost = () => {
    const finishPrices: Record<string, number> = {
      "Vinyl Liner": 3000,
      Fiberglass: 8000,
      "Concrete/Gunite": 12000,
      Tile: 18000,
      Pebble: 15000,
    }
    return (finishPrices[data.finish] || 0) * materialsMultiplier
  }

  // Calculate extras cost
  const getExtrasCost = () => {
    const extraPrices: Record<string, number> = {
      "LED Pool Lights": 550,
      "Pool Deck": 6500,
      "Heating System": 3500,
      "Water Jets": 1250,
      "Pool Cover": 950,
      "Diving Board": 650,
      Slide: 3000,
      "Waterfall Feature": 3250,
      "Saltwater System": 2000,
      "Pool Fence": 2750,
    }

    return (data.extras || []).reduce((sum, extra) => sum + (extraPrices[extra] || 0), 0) * extrasMultiplier
  }

  // Calculate excavation cost based on soil type
  const getExcavationCost = () => {
    if (data.poolType === "Above-Ground") return 0

    const soilMultipliers: Record<string, number> = {
      Sandy: 1,
      Loamy: 1.2,
      Clay: 1.4,
      Rocky: 2,
    }

    const baseExcavation = data.poolType === "In-Ground" ? 5000 : 2500
    return baseExcavation * (soilMultipliers[data.soilType] || 1) * materialsMultiplier
  }

  const baseCost = getBaseCost()
  const finishCost = getFinishCost()
  const extrasCost = getExtrasCost()
  const excavationCost = getExcavationCost()
  const laborCost = (baseCost + finishCost) * 0.3 * laborMultiplier

  const totalCost = baseCost + finishCost + extrasCost + excavationCost + laborCost

  // Budget vs Premium comparison
  const budgetTotal = totalCost * 0.7 // DIY can save ~30%
  const premiumTotal = totalCost * 1.3 // Premium contractors charge ~30% more

  const costBreakdown = [
    { name: "Base Pool Structure", amount: baseCost, color: "bg-chart-1" },
    { name: "Surface Finish", amount: finishCost, color: "bg-chart-2" },
    { name: "Excavation & Site Prep", amount: excavationCost, color: "bg-chart-3" },
    { name: "Labor & Installation", amount: laborCost, color: "bg-chart-4" },
    { name: "Additional Features", amount: extrasCost, color: "bg-chart-5" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground">Budget Estimate</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Estimated costs for your pool project based on your selections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Cost Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-chart-3/30 bg-chart-3/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-chart-3" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Budget DIY</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${budgetTotal.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Self-installation, basic materials</p>
          </Card>

          <Card className="p-4 border-primary/50 bg-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Standard Build</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${totalCost.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Professional help, quality materials</p>
          </Card>

          <Card className="p-4 border-chart-1/30 bg-chart-1/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-chart-1" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Premium Build</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${premiumTotal.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Top contractors, premium finishes</p>
          </Card>
        </div>

        <Card className="p-4 bg-secondary/50 border-border">
          <h4 className="font-semibold text-foreground mb-4">Adjust Your Budget</h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Materials Quality</Label>
                <Badge variant="outline" className="font-mono text-foreground">
                  {materialsMultiplier === 0.7 ? "Budget" : materialsMultiplier === 1 ? "Standard" : "Premium"}
                </Badge>
              </div>
              <Slider
                value={[materialsMultiplier]}
                onValueChange={(value) => setMaterialsMultiplier(value[0])}
                min={0.7}
                max={1.3}
                step={0.3}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Adjust material quality from budget to premium options</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Labor Level</Label>
                <Badge variant="outline" className="font-mono text-foreground">
                  {laborMultiplier === 0.5 ? "DIY" : laborMultiplier === 1 ? "Standard" : "Premium"}
                </Badge>
              </div>
              <Slider
                value={[laborMultiplier]}
                onValueChange={(value) => setLaborMultiplier(value[0])}
                min={0.5}
                max={1.5}
                step={0.5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">From DIY installation to premium contractor services</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Features Budget</Label>
                <Badge variant="outline" className="font-mono text-foreground">
                  {extrasMultiplier === 0.7 ? "Basic" : extrasMultiplier === 1 ? "Standard" : "Luxury"}
                </Badge>
              </div>
              <Slider
                value={[extrasMultiplier]}
                onValueChange={(value) => setExtrasMultiplier(value[0])}
                min={0.7}
                max={1.3}
                step={0.3}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Adjust budget for additional features and upgrades</p>
            </div>
          </div>
        </Card>

        {/* Cost Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Cost Breakdown</h4>
          {costBreakdown.map((item) => {
            const percentage = (item.amount / totalCost) * 100
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-foreground border-border">
                      {percentage.toFixed(0)}%
                    </Badge>
                    <span className="font-semibold text-foreground w-24 text-right">
                      ${item.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`absolute inset-y-0 left-0 ${item.color}`} style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Savings Tips */}
        <Card className="p-4 bg-primary/5 border-primary/30">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-primary" />
            Money-Saving Tips
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• DIY excavation can save $2,000-5,000</li>
            <li>• Off-season installation (fall/winter) often gets 10-20% discounts</li>
            <li>• Simpler shapes (rectangular) are cheaper than freeform designs</li>
            <li>• Consider a smaller pool with better features vs larger basic pool</li>
          </ul>
        </Card>
      </CardContent>
    </Card>
  )
}
