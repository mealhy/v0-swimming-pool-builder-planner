"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { PoolPlanData } from "@/lib/types"
import { Droplets, Zap, Wrench, Calendar } from "lucide-react"

interface MaintenanceCalculatorProps {
  data: PoolPlanData
}

export default function MaintenanceCalculator({ data }: MaintenanceCalculatorProps) {
  // Calculate pool volume in gallons
  const getPoolVolume = () => {
    let length = 0,
      width = 0,
      depth = 0

    if (data.size === "Small") {
      length = 15
      width = 30
      depth = 4
    } else if (data.size === "Medium") {
      length = 20
      width = 40
      depth = 5
    } else if (data.size === "Large") {
      length = 25
      width = 50
      depth = 6
    } else if (data.size === "Custom") {
      length = data.customLength || 20
      width = data.customWidth || 40
      depth = data.customDepth || 5
    }

    // Volume in gallons: length × width × depth × 7.5
    return length * width * depth * 7.5
  }

  const volume = getPoolVolume()

  // Calculate annual costs
  const getChemicalsCost = () => {
    // Base cost per 1000 gallons per year
    const baseRate = data.extras.includes("Saltwater System") ? 150 : 300
    return (volume / 1000) * baseRate
  }

  const getElectricityCost = () => {
    // Pump runs ~8 hours/day, ~$50-100/month depending on size
    const hasHeating = data.extras.includes("Heating System")
    const baseElectric = (volume / 10000) * 600 // Annual pump cost
    const heatingCost = hasHeating ? 1200 : 0
    return baseElectric + heatingCost
  }

  const getWaterCost = () => {
    // Average evaporation: 1-2 inches per week in summer
    // Refill cost varies by location, estimate $200-400/year
    return data.extras.includes("Pool Cover") ? 150 : 300
  }

  const getMaintenanceCost = () => {
    // Professional cleaning, repairs, equipment
    const poolTypeMultiplier = data.poolType === "Above-Ground" ? 0.5 : data.poolType === "Semi-In-Ground" ? 0.75 : 1

    return 800 * poolTypeMultiplier
  }

  const chemicalsCost = getChemicalsCost()
  const electricityCost = getElectricityCost()
  const waterCost = getWaterCost()
  const maintenanceCost = getMaintenanceCost()
  const totalAnnualCost = chemicalsCost + electricityCost + waterCost + maintenanceCost

  // Maintenance schedule
  const maintenanceTasks = [
    { frequency: "Daily", task: "Check water level and skim debris", time: "10 min" },
    { frequency: "Weekly", task: "Test and balance water chemistry", time: "30 min" },
    { frequency: "Weekly", task: "Vacuum pool floor and brush walls", time: "45 min" },
    { frequency: "Monthly", task: "Clean filter and check equipment", time: "1 hour" },
    { frequency: "Quarterly", task: "Deep clean and shock treatment", time: "2 hours" },
    { frequency: "Annually", task: "Professional inspection and winterization", time: "4 hours" },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground">Maintenance Calculator</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Estimated annual maintenance costs and time requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pool Volume */}
        <Card className="p-4 bg-primary/5 border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Pool Volume</span>
            </div>
            <span className="text-2xl font-bold text-foreground">{volume.toLocaleString()} gal</span>
          </div>
        </Card>

        {/* Annual Cost Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Annual Maintenance Costs</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-chart-1" />
                <span className="text-sm text-foreground">Chemicals & Supplies</span>
              </div>
              <span className="font-semibold text-foreground">${chemicalsCost.toFixed(0)}</span>
            </div>
            <Progress value={(chemicalsCost / totalAnnualCost) * 100} className="h-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-chart-2" />
                <span className="text-sm text-foreground">Electricity (Pump & Heating)</span>
              </div>
              <span className="font-semibold text-foreground">${electricityCost.toFixed(0)}</span>
            </div>
            <Progress value={(electricityCost / totalAnnualCost) * 100} className="h-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-chart-3" />
                <span className="text-sm text-foreground">Water Refills</span>
              </div>
              <span className="font-semibold text-foreground">${waterCost.toFixed(0)}</span>
            </div>
            <Progress value={(waterCost / totalAnnualCost) * 100} className="h-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-chart-4" />
                <span className="text-sm text-foreground">Repairs & Professional Service</span>
              </div>
              <span className="font-semibold text-foreground">${maintenanceCost.toFixed(0)}</span>
            </div>
            <Progress value={(maintenanceCost / totalAnnualCost) * 100} className="h-2" />
          </div>

          <Card className="p-4 border-primary/50 bg-primary/10">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">Total Annual Cost</span>
              <span className="text-2xl font-bold text-foreground">${totalAnnualCost.toFixed(0)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Approximately ${(totalAnnualCost / 12).toFixed(0)}/month
            </p>
          </Card>
        </div>

        {/* Maintenance Schedule */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-foreground">Maintenance Schedule</h4>
          </div>
          <div className="space-y-2">
            {maintenanceTasks.map((task, idx) => (
              <Card key={idx} className="p-3 bg-secondary/50 border-border">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                        {task.frequency}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{task.time}</span>
                    </div>
                    <p className="text-sm text-foreground">{task.task}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cost-Saving Tips */}
        <Card className="p-4 bg-green-500/5 border-green-500/30">
          <h4 className="font-semibold text-foreground mb-2">Cost-Saving Tips</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Use a pool cover to reduce evaporation and chemical use by 30-50%</li>
            <li>• Run pump during off-peak hours to save on electricity</li>
            <li>• Saltwater systems reduce chemical costs by up to 50%</li>
            <li>• Regular maintenance prevents costly repairs</li>
          </ul>
        </Card>
      </CardContent>
    </Card>
  )
}
