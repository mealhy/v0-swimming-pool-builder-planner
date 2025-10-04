"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PoolPlanData } from "@/lib/types"
import { Calendar, Clock } from "lucide-react"

interface TimelinePlannerProps {
  data: PoolPlanData
}

export default function TimelinePlanner({ data }: TimelinePlannerProps) {
  // Calculate timeline based on pool type and complexity
  const getTimeline = () => {
    const basePhases = [
      {
        name: "Planning & Permits",
        description: "Design finalization, permit applications, site survey",
        duration: "1-2 weeks",
        days: 10,
      },
      {
        name: "Excavation",
        description: "Site preparation, digging, grading",
        duration: data.poolType === "Above-Ground" ? "1-2 days" : data.soilType === "Rocky" ? "5-7 days" : "3-5 days",
        days: data.poolType === "Above-Ground" ? 1 : data.soilType === "Rocky" ? 6 : 4,
      },
      {
        name: "Structure & Plumbing",
        description: "Pool shell installation, plumbing, electrical work",
        duration:
          data.poolType === "Above-Ground"
            ? "1-2 days"
            : data.poolType === "Semi-In-Ground"
              ? "1-2 weeks"
              : "2-3 weeks",
        days: data.poolType === "Above-Ground" ? 1 : data.poolType === "Semi-In-Ground" ? 10 : 17,
      },
      {
        name: "Surface Finish",
        description: `Apply ${data.finish || "selected finish"}, curing time`,
        duration:
          data.finish === "Vinyl Liner"
            ? "2-3 days"
            : data.finish === "Fiberglass"
              ? "1-2 days"
              : data.finish === "Tile"
                ? "1-2 weeks"
                : "1 week",
        days: data.finish === "Vinyl Liner" ? 2 : data.finish === "Fiberglass" ? 1 : data.finish === "Tile" ? 10 : 7,
      },
    ]

    // Add deck phase if selected
    if (data.extras?.includes("Pool Deck")) {
      basePhases.push({
        name: "Decking Installation",
        description: "Surrounding deck construction and finishing",
        duration: "1-2 weeks",
        days: 10,
      })
    }

    // Add final phase
    basePhases.push({
      name: "Equipment & Finishing",
      description: "Install pumps, filters, lights, fill pool, chemical balance",
      duration: "3-5 days",
      days: 4,
    })

    return basePhases
  }

  const timeline = getTimeline()
  const totalDays = timeline.reduce((sum, phase) => sum + phase.days, 0)
  const totalWeeks = Math.ceil(totalDays / 7)

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground">Construction Timeline</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Estimated project duration: {totalWeeks} weeks ({totalDays} days)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline Summary */}
        <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/30 rounded-lg">
          <Clock className="w-8 h-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Total Project Duration</p>
            <p className="text-2xl font-bold text-foreground">
              {totalWeeks} {totalWeeks === 1 ? "Week" : "Weeks"}
            </p>
          </div>
        </div>

        {/* Timeline Phases */}
        <div className="space-y-4">
          {timeline.map((phase, index) => {
            const phasePercentage = (phase.days / totalDays) * 100
            return (
              <div key={phase.name} className="relative">
                {/* Connector Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-border translate-y-2" />
                )}

                <div className="flex gap-4">
                  {/* Phase Number */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Phase Content */}
                  <Card className="flex-1 p-4 border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{phase.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                      </div>
                      <Badge variant="outline" className="ml-4 font-mono text-foreground border-primary/50">
                        {phase.duration}
                      </Badge>
                    </div>

                    {/* Duration Bar */}
                    <div className="mt-3">
                      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-primary"
                          style={{ width: `${phasePercentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {phasePercentage.toFixed(0)}% of total timeline
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline Notes */}
        <Card className="p-4 bg-muted/30 border-border">
          <h4 className="font-semibold text-foreground mb-2">Timeline Notes</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Weather delays can add 1-2 weeks to outdoor projects</li>
            <li>• Permit approval times vary by location (1-4 weeks typical)</li>
            <li>• Complex shapes and custom features may extend timeline by 20-30%</li>
            <li>• Winter construction may take longer due to curing times</li>
          </ul>
        </Card>
      </CardContent>
    </Card>
  )
}
