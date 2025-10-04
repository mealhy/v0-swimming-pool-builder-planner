"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PoolPlanData } from "@/lib/types"
import { CheckCircle2 } from "lucide-react"
import BudgetCalculator from "@/components/budget-calculator"
import TimelinePlanner from "@/components/timeline-planner"
import MaterialChecklist from "@/components/material-checklist"
import ExportPlan from "@/components/export-plan"
import PoolVisualizer from "@/components/pool-visualizer"
import AIRecommendations from "@/components/ai-recommendations"
import MaintenanceCalculator from "@/components/maintenance-calculator"
import SafetyChecker from "@/components/safety-checker"
import ProductRecommendations from "@/components/product-recommendations"
import ROICalculator from "@/components/roi-calculator"

interface ReviewStepProps {
  data: PoolPlanData
}

export default function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="p-6 border-primary/50 bg-primary/5">
        <div className="flex items-start gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Your Pool Plan Summary</h3>
            <p className="text-sm text-muted-foreground">Review your selections before exporting your complete plan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="space-y-3">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Location</span>
              <p className="text-foreground font-medium">{data.location || "Not selected"}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Soil Type</span>
              <p className="text-foreground font-medium">{data.soilType || "Not selected"}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Shape</span>
              <p className="text-foreground font-medium">{data.shape || "Not selected"}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Size</span>
              <p className="text-foreground font-medium">
                {data.size === "Custom"
                  ? `${data.customLength}' x ${data.customWidth}' x ${data.customDepth}' deep`
                  : data.size || "Not selected"}
              </p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Type</span>
              <p className="text-foreground font-medium">{data.poolType || "Not selected"}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Finish</span>
              <p className="text-foreground font-medium">{data.finish || "Not selected"}</p>
            </div>
          </div>
        </div>

        {data.extras && data.extras.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Additional Features</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.extras.map((extra) => (
                <Badge key={extra} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  {extra}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      <AIRecommendations data={data} />

      {/* 2D Pool Visualizer */}
      <PoolVisualizer data={data} />

      <ExportPlan data={data} />

      {/* Budget Calculator */}
      <BudgetCalculator data={data} />

      {/* ROI Calculator */}
      <ROICalculator data={data} />

      {/* Maintenance Calculator */}
      <MaintenanceCalculator data={data} />

      {/* Safety Checker */}
      <SafetyChecker data={data} />

      {/* Product Recommendations */}
      <ProductRecommendations data={data} />

      {/* Timeline */}
      <TimelinePlanner data={data} />

      {/* Materials */}
      <MaterialChecklist data={data} />
    </div>
  )
}
