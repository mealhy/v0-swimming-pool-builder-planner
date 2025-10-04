"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lightbulb, AlertTriangle, Info } from "lucide-react"
import type { PoolPlanData } from "@/lib/types"
import { generateRecommendations } from "@/lib/ai-recommendations"

interface AIRecommendationsProps {
  data: PoolPlanData
}

export default function AIRecommendations({ data }: AIRecommendationsProps) {
  const recommendations = generateRecommendations(data)

  if (recommendations.length === 0) {
    return null
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "medium":
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Lightbulb className="w-5 h-5 text-cyan-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/30"
      case "medium":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
      default:
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/30"
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          <div>
            <CardTitle className="text-xl text-card-foreground">AI Recommendations</CardTitle>
            <CardDescription className="text-muted-foreground">
              Personalized suggestions based on your selections
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <Alert key={index} className="border-border bg-background">
            <div className="flex items-start gap-3">
              {getPriorityIcon(rec.priority)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-foreground">{rec.title}</h4>
                  <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                </div>
                <AlertDescription className="text-muted-foreground mb-2">{rec.description}</AlertDescription>
                <p className="text-xs text-muted-foreground italic">Why: {rec.reason}</p>
              </div>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
