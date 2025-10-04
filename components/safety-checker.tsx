"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import type { PoolPlanData } from "@/lib/types"
import { Shield, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

interface SafetyCheckerProps {
  data: PoolPlanData
}

interface SafetyItem {
  category: string
  item: string
  status: "required" | "recommended" | "optional"
  present: boolean
  description: string
  cost?: string
}

export default function SafetyChecker({ data }: SafetyCheckerProps) {
  const safetyItems: SafetyItem[] = [
    {
      category: "Barriers & Fencing",
      item: "Pool Fence (4ft minimum)",
      status: "required",
      present: data.extras.includes("Pool Fence"),
      description: "Required by law in most jurisdictions. Must have self-closing, self-latching gate.",
      cost: "$2,000-$5,000",
    },
    {
      category: "Barriers & Fencing",
      item: "Pool Alarm",
      status: "recommended",
      present: false,
      description: "Alerts when someone enters the pool area or water surface is disturbed.",
      cost: "$100-$300",
    },
    {
      category: "Covers & Protection",
      item: "Safety Pool Cover",
      status: "recommended",
      present: data.extras.includes("Pool Cover"),
      description: "Prevents accidental falls into pool when not in use. Must support weight.",
      cost: "$1,000-$3,000",
    },
    {
      category: "Emergency Equipment",
      item: "Life Ring/Rescue Hook",
      status: "required",
      present: false,
      description: "Essential rescue equipment that should be easily accessible.",
      cost: "$30-$100",
    },
    {
      category: "Emergency Equipment",
      item: "First Aid Kit",
      status: "required",
      present: false,
      description: "Pool-specific first aid kit for minor injuries and emergencies.",
      cost: "$50-$150",
    },
    {
      category: "Visibility & Lighting",
      item: "Pool Lighting",
      status: "recommended",
      present: data.extras.includes("LED Lighting"),
      description: "Adequate lighting for nighttime visibility and safety.",
      cost: "$500-$2,000",
    },
    {
      category: "Surface Safety",
      item: "Non-Slip Deck Surface",
      status: "required",
      present: data.extras.includes("Pool Deck"),
      description: "Textured, slip-resistant surface around pool perimeter.",
      cost: "Included in deck",
    },
    {
      category: "Depth Markers",
      item: "Depth Markers & Signs",
      status: "required",
      present: false,
      description: "Clear depth markings and 'No Diving' signs where appropriate.",
      cost: "$50-$200",
    },
    {
      category: "Electrical Safety",
      item: "GFCI Protection",
      status: "required",
      present: true,
      description: "Ground Fault Circuit Interrupter for all electrical outlets near pool.",
      cost: "$100-$300",
    },
    {
      category: "Chemical Storage",
      item: "Locked Chemical Storage",
      status: "required",
      present: false,
      description: "Secure, ventilated storage for pool chemicals away from children.",
      cost: "$100-$500",
    },
  ]

  const requiredItems = safetyItems.filter((item) => item.status === "required")
  const recommendedItems = safetyItems.filter((item) => item.status === "recommended")

  const requiredMet = requiredItems.filter((item) => item.present).length
  const recommendedMet = recommendedItems.filter((item) => item.present).length

  const safetyScore = (requiredMet / requiredItems.length) * 70 + (recommendedMet / recommendedItems.length) * 30

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "bg-green-500/10 text-green-500 border-green-500/30" }
    if (score >= 60) return { text: "Good", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" }
    return { text: "Needs Improvement", color: "bg-red-500/10 text-red-500 border-red-500/30" }
  }

  const scoreBadge = getScoreBadge(safetyScore)

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground">Safety Compliance Checker</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Ensure your pool meets safety standards and best practices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Safety Score */}
        <Card className="p-6 border-primary/50 bg-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Safety Score</h3>
              <div className="flex items-center gap-3">
                <span className={`text-4xl font-bold ${getScoreColor(safetyScore)}`}>{safetyScore.toFixed(0)}%</span>
                <Badge variant="outline" className={scoreBadge.color}>
                  {scoreBadge.text}
                </Badge>
              </div>
            </div>
            <Shield className={`w-16 h-16 ${getScoreColor(safetyScore)}`} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Required Items</span>
              <p className="font-semibold text-foreground">
                {requiredMet} / {requiredItems.length}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Recommended Items</span>
              <p className="font-semibold text-foreground">
                {recommendedMet} / {recommendedItems.length}
              </p>
            </div>
          </div>
        </Card>

        {/* Critical Alerts */}
        {requiredMet < requiredItems.length && (
          <Alert className="border-red-500/50 bg-red-500/5">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <AlertDescription className="text-foreground">
              <strong>Action Required:</strong> You are missing {requiredItems.length - requiredMet} required safety
              item(s). These are legally mandated in most areas and critical for preventing accidents.
            </AlertDescription>
          </Alert>
        )}

        {/* Safety Checklist */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Safety Checklist</h4>

          {/* Required Items */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h5 className="text-sm font-semibold text-foreground">Required Items</h5>
            </div>
            {requiredItems.map((item, idx) => (
              <Card
                key={idx}
                className={`p-4 ${item.present ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"}`}
              >
                <div className="flex items-start gap-3">
                  {item.present ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h6 className="font-semibold text-foreground">{item.item}</h6>
                      {item.cost && (
                        <Badge variant="outline" className="text-xs text-foreground border-border">
                          {item.cost}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Recommended Items */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3 mt-6">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <h5 className="text-sm font-semibold text-foreground">Recommended Items</h5>
            </div>
            {recommendedItems.map((item, idx) => (
              <Card
                key={idx}
                className={`p-4 ${item.present ? "border-green-500/30 bg-green-500/5" : "border-border bg-secondary/30"}`}
              >
                <div className="flex items-start gap-3">
                  {item.present ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h6 className="font-semibold text-foreground">{item.item}</h6>
                      {item.cost && (
                        <Badge variant="outline" className="text-xs text-foreground border-border">
                          {item.cost}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <Card className="p-4 bg-blue-500/5 border-blue-500/30">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-500" />
            Additional Safety Tips
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Never leave children unattended near the pool</li>
            <li>• Establish and enforce pool rules (no running, no diving in shallow end)</li>
            <li>• Keep rescue equipment and phone nearby at all times</li>
            <li>• Learn CPR and basic water rescue techniques</li>
            <li>• Regularly inspect and maintain all safety equipment</li>
          </ul>
        </Card>
      </CardContent>
    </Card>
  )
}
