"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { PoolPlanData } from "@/lib/types"
import { Download, Mail, FileText, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { calculateBudget } from "@/lib/budget-utils"
import { getTimelinePhases } from "@/lib/timeline-utils"
import { getMaterialsList } from "@/lib/materials-utils"

interface ExportPlanProps {
  data: PoolPlanData
}

export default function ExportPlan({ data }: ExportPlanProps) {
  const { toast } = useToast()

  const handleExportPDF = () => {
    console.log("[v0] Starting PDF export")

    try {
      const budget = calculateBudget(data)
      const timeline = getTimelinePhases(data)
      const materials = getMaterialsList(data)

      // Create a printable HTML document
      const printWindow = window.open("", "_blank")
      if (!printWindow) {
        toast({
          title: "Popup Blocked",
          description: "Please allow popups to download the PDF",
          variant: "destructive",
        })
        return
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>DIY Swimming Pool Builder Plan</title>
          <style>
            @media print {
              @page { margin: 1in; }
              body { margin: 0; }
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            h1 { color: #0ea5e9; font-size: 28px; margin-bottom: 10px; }
            h2 { color: #0284c7; font-size: 22px; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px; }
            h3 { color: #0369a1; font-size: 18px; margin-top: 20px; margin-bottom: 10px; }
            .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .summary-item { margin-bottom: 15px; }
            .summary-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
            .summary-value { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-top: 3px; }
            .extras { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
            .extra-badge { background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 4px; font-size: 14px; }
            .budget-item, .timeline-item, .material-item { 
              padding: 12px; 
              margin: 8px 0; 
              background: #f8fafc; 
              border-left: 3px solid #0ea5e9; 
            }
            .cost { font-weight: 700; color: #0ea5e9; }
            .total { font-size: 20px; font-weight: 700; color: #0ea5e9; margin-top: 15px; padding: 15px; background: #e0f2fe; border-radius: 8px; }
            .warning { background: #fef3c7; border-left-color: #f59e0b; padding: 15px; margin: 20px 0; }
            ul { margin: 10px 0; padding-left: 25px; }
            li { margin: 5px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <h1>🏊 DIY Swimming Pool Builder Plan</h1>
          <p style="color: #666; margin-bottom: 30px;">Generated on ${new Date().toLocaleDateString()}</p>

          <h2>Pool Configuration</h2>
          <div class="summary-grid">
            <div>
              <div class="summary-item">
                <div class="summary-label">Location</div>
                <div class="summary-value">${data.location || "Not specified"}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Soil Type</div>
                <div class="summary-value">${data.soilType || "Not specified"}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Shape</div>
                <div class="summary-value">${data.shape || "Not specified"}</div>
              </div>
            </div>
            <div>
              <div class="summary-item">
                <div class="summary-label">Size</div>
                <div class="summary-value">${
                  data.size === "Custom"
                    ? `${data.customLength}' × ${data.customWidth}' × ${data.customDepth}' deep`
                    : data.size || "Not specified"
                }</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Type</div>
                <div class="summary-value">${data.poolType || "Not specified"}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Finish</div>
                <div class="summary-value">${data.finish || "Not specified"}</div>
              </div>
            </div>
          </div>

          ${
            data.extras && data.extras.length > 0
              ? `
            <div class="summary-item">
              <div class="summary-label">Additional Features</div>
              <div class="extras">
                ${data.extras.map((extra) => `<span class="extra-badge">${extra}</span>`).join("")}
              </div>
            </div>
          `
              : ""
          }

          <h2>Budget Breakdown</h2>
          ${Object.entries(budget.breakdown)
            .map(
              ([category, cost]) => `
            <div class="budget-item">
              <strong>${category}:</strong> <span class="cost">$${cost.toLocaleString()}</span>
            </div>
          `,
            )
            .join("")}
          <div class="total">Total Estimated Cost: $${budget.total.toLocaleString()}</div>

          <h2>Construction Timeline</h2>
          ${timeline
            .map(
              (phase, index) => `
            <div class="timeline-item">
              <strong>Phase ${index + 1}: ${phase.phase}</strong><br>
              Duration: ${phase.duration}<br>
              ${phase.notes ? `<em style="color: #666;">${phase.notes}</em>` : ""}
            </div>
          `,
            )
            .join("")}
          <p><strong>Total Timeline:</strong> ${timeline.reduce((sum, p) => sum + Number.parseInt(p.duration), 0)} days</p>

          <h2>Materials & Tools Checklist</h2>
          ${Object.entries(materials)
            .map(
              ([category, items]) => `
            <h3>${category}</h3>
            <ul>
              ${items.map((item) => `<li>${item.name} - $${item.price}</li>`).join("")}
            </ul>
          `,
            )
            .join("")}

          <div class="warning">
            <h3 style="margin-top: 0;">⚠️ Important Legal & Safety Reminders</h3>
            <ul>
              <li>Check local building codes and zoning requirements before starting</li>
              <li>Most areas require permits for in-ground pool installation</li>
              <li>Safety fencing may be legally required in your jurisdiction</li>
              <li>Call 811 before digging to locate underground utilities</li>
              <li>Consider hiring licensed professionals for electrical and plumbing work</li>
              <li>Ensure proper drainage and water management systems</li>
              <li>Install appropriate safety equipment (ladders, covers, alarms)</li>
            </ul>
          </div>

          <div class="footer">
            <p>Generated by DIY Swimming Pool Builder Planner | v0.dev</p>
            <p>This is an estimate only. Actual costs and timelines may vary based on location, materials availability, and site conditions.</p>
          </div>
        </body>
        </html>
      `

      printWindow.document.write(htmlContent)
      printWindow.document.close()

      // Wait for content to load, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          toast({
            title: "PDF Ready",
            description: "Use your browser's print dialog to save as PDF",
          })
        }, 250)
      }
    } catch (error) {
      console.error("[v0] PDF export error:", error)
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF",
        variant: "destructive",
      })
    }
  }

  const handleEmailPlan = () => {
    const budget = calculateBudget(data)
    const timeline = getTimelinePhases(data)

    const subject = encodeURIComponent("My DIY Swimming Pool Plan")
    const body = encodeURIComponent(
      `DIY SWIMMING POOL BUILDER PLAN
Generated on ${new Date().toLocaleDateString()}

POOL CONFIGURATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location: ${data.location || "Not specified"}
Soil Type: ${data.soilType || "Not specified"}
Shape: ${data.shape || "Not specified"}
Size: ${data.size === "Custom" ? `${data.customLength}' × ${data.customWidth}' × ${data.customDepth}' deep` : data.size || "Not specified"}
Type: ${data.poolType || "Not specified"}
Finish: ${data.finish || "Not specified"}
${data.extras && data.extras.length > 0 ? `Extras: ${data.extras.join(", ")}` : ""}

BUDGET ESTIMATE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${Object.entries(budget.breakdown)
  .map(([cat, cost]) => `${cat}: $${cost.toLocaleString()}`)
  .join("\n")}

TOTAL: $${budget.total.toLocaleString()}

TIMELINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${timeline.map((p, i) => `Phase ${i + 1}: ${p.phase} (${p.duration})`).join("\n")}

Total Duration: ${timeline.reduce((sum, p) => sum + Number.parseInt(p.duration), 0)} days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by DIY Swimming Pool Builder Planner
Visit the app to see full materials list and detailed recommendations.
      `,
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`

    toast({
      title: "Opening Email",
      description: "Your email client will open with the plan details",
    })
  }

  const handleCopyLink = () => {
    try {
      // Encode plan data in URL
      const planData = btoa(JSON.stringify(data))
      const shareUrl = `${window.location.origin}${window.location.pathname}?plan=${planData}`

      navigator.clipboard.writeText(shareUrl)
      toast({
        title: "Link Copied",
        description: "Share this link to let others view your pool plan",
      })
    } catch (error) {
      console.error("[v0] Copy link error:", error)
      toast({
        title: "Copy Failed",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      })
    }
  }

  const handlePrintPlan = () => {
    // Use the same PDF generation but trigger print immediately
    handleExportPDF()
  }

  return (
    <Card className="p-6 border-primary/50 bg-primary/5">
      <div className="flex items-start gap-3 mb-6">
        <FileText className="w-6 h-6 text-primary mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Export Your Pool Plan</h3>
          <p className="text-sm text-muted-foreground">
            Save, share, or print your complete pool building plan with all materials, costs, and timeline
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button
          onClick={handleExportPDF}
          className="bg-primary text-primary-foreground hover:bg-primary/90 justify-start"
        >
          <Download className="w-4 h-4 mr-2" />
          Download as PDF
        </Button>

        <Button
          onClick={handleEmailPlan}
          variant="outline"
          className="text-foreground border-border hover:bg-secondary justify-start bg-transparent"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Plan
        </Button>

        <Button
          onClick={handlePrintPlan}
          variant="outline"
          className="text-foreground border-border hover:bg-secondary justify-start bg-transparent"
        >
          <FileText className="w-4 h-4 mr-2" />
          Print Plan
        </Button>

        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="text-foreground border-border hover:bg-secondary justify-start bg-transparent"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Copy Share Link
        </Button>
      </div>

      {/* Legal Reminder */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-semibold text-foreground mb-2 text-sm">Important Reminders</h4>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Check local building codes and zoning requirements before starting</li>
          <li>• Most areas require permits for in-ground pool installation</li>
          <li>• Safety fencing may be legally required in your jurisdiction</li>
          <li>• Call 811 before digging to locate underground utilities</li>
          <li>• Consider hiring licensed professionals for electrical and plumbing work</li>
          <li>• Ensure proper drainage and water management systems</li>
          <li>• Install appropriate safety equipment (ladders, covers, alarms)</li>
        </ul>
      </div>
    </Card>
  )
}
