"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { PoolPlanData } from "@/lib/types"
import { TrendingUp, Home, DollarSign, Calendar } from "lucide-react"

interface ROICalculatorProps {
  data: PoolPlanData
}

export default function ROICalculator({ data }: ROICalculatorProps) {
  // Calculate installation cost
  const getInstallationCost = () => {
    let sizeFactor = 1
    if (data.size === "Small") sizeFactor = 0.7
    else if (data.size === "Medium") sizeFactor = 1
    else if (data.size === "Large") sizeFactor = 1.5
    else if (data.size === "Custom") {
      const area = data.customLength * data.customWidth
      sizeFactor = area / 450
    }

    let basePrice = 0
    if (data.poolType === "Above-Ground") basePrice = 5000
    else if (data.poolType === "Semi-In-Ground") basePrice = 15000
    else if (data.poolType === "In-Ground") basePrice = 30000

    const finishPrices: Record<string, number> = {
      "Vinyl Liner": 3000,
      Fiberglass: 8000,
      "Concrete/Gunite": 12000,
      Tile: 18000,
      Pebble: 15000,
    }

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

    const baseCost = basePrice * sizeFactor
    const finishCost = finishPrices[data.finish] || 0
    const extrasCost = (data.extras || []).reduce((sum, extra) => sum + (extraPrices[extra] || 0), 0)
    const laborCost = (baseCost + finishCost) * 0.3

    return baseCost + finishCost + extrasCost + laborCost
  }

  const installationCost = getInstallationCost()

  // Property value increase
  const getPropertyValueIncrease = () => {
    // In-ground pools typically add 5-8% to home value
    // Semi-in-ground: 3-5%
    // Above-ground: 0-2%
    const multipliers: Record<string, number> = {
      "In-Ground": 0.065, // 6.5% average
      "Semi-In-Ground": 0.04, // 4% average
      "Above-Ground": 0.01, // 1% average
    }

    const averageHomeValue = 350000 // National average
    return averageHomeValue * (multipliers[data.poolType] || 0)
  }

  const propertyValueIncrease = getPropertyValueIncrease()

  // ROI calculation
  const roi = ((propertyValueIncrease - installationCost) / installationCost) * 100
  const breakEvenYears = Math.abs(installationCost / (propertyValueIncrease / 10)) // Rough estimate

  // Lifestyle value (non-monetary)
  const lifestyleValue = [
    { benefit: "Family Entertainment", value: "Priceless memories and quality time" },
    { benefit: "Health & Fitness", value: "Low-impact exercise year-round" },
    { benefit: "Social Hub", value: "Hosting parties and gatherings" },
    { benefit: "Stress Relief", value: "Personal relaxation oasis" },
  ]

  // Annual costs
  const annualMaintenance = 2500 // Simplified estimate

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground">Return on Investment (ROI)</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Financial analysis and value assessment for your pool investment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-border bg-secondary/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-chart-1" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Total Investment</span>
            </div>
            <p className="text-2xl font-bold text-foreground">${installationCost.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Installation + materials + labor</p>
          </Card>

          <Card className="p-4 border-primary/30 bg-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Property Value Increase</span>
            </div>
            <p className="text-2xl font-bold text-foreground">+${propertyValueIncrease.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Estimated home value boost</p>
          </Card>

          <Card
            className={`p-4 ${roi >= 0 ? "border-green-500/30 bg-green-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`w-4 h-4 ${roi >= 0 ? "text-green-500" : "text-yellow-500"}`} />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Financial ROI</span>
            </div>
            <p className={`text-2xl font-bold ${roi >= 0 ? "text-green-500" : "text-yellow-500"}`}>
              {roi >= 0 ? "+" : ""}
              {roi.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Return on investment</p>
          </Card>
        </div>

        {/* ROI Analysis */}
        <Card className="p-4 bg-secondary/50 border-border">
          <h4 className="font-semibold text-foreground mb-4">Investment Analysis</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">Cost Recovery</span>
                <span className="text-sm font-semibold text-foreground">
                  {((propertyValueIncrease / installationCost) * 100).toFixed(0)}%
                </span>
              </div>
              <Progress value={(propertyValueIncrease / installationCost) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                You'll recover approximately ${propertyValueIncrease.toLocaleString()} of your $
                {installationCost.toLocaleString()} investment through increased property value
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Break-Even Period</span>
                </div>
                <p className="text-lg font-bold text-foreground">{breakEvenYears.toFixed(1)} years</p>
                <p className="text-xs text-muted-foreground">Estimated time to full ROI</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Annual Cost</span>
                </div>
                <p className="text-lg font-bold text-foreground">${annualMaintenance}</p>
                <p className="text-xs text-muted-foreground">Ongoing maintenance expenses</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Lifestyle Value */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Lifestyle Value (Beyond Money)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lifestyleValue.map((item, idx) => (
              <Card key={idx} className="p-4 bg-primary/5 border-primary/30">
                <h5 className="font-semibold text-foreground mb-1">{item.benefit}</h5>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* ROI Tips */}
        <Card className="p-4 bg-blue-500/5 border-blue-500/30">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            Maximizing Your ROI
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• In-ground pools offer the best property value increase (5-8%)</li>
            <li>• Energy-efficient equipment reduces long-term operating costs</li>
            <li>• Regular maintenance prevents costly repairs and extends pool life</li>
            <li>• Quality finishes and features appeal more to future buyers</li>
            <li>• Consider your enjoyment and lifestyle benefits beyond pure financial ROI</li>
          </ul>
        </Card>
      </CardContent>
    </Card>
  )
}
