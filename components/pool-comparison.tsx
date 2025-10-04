"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, DollarSign } from "lucide-react"
import { useState } from "react"

interface PoolOption {
  name: string
  type: "Above-Ground" | "Semi-In-Ground" | "In-Ground"
  cost: { min: number; max: number }
  lifespan: string
  maintenance: "Low" | "Medium" | "High"
  installTime: string
  pros: string[]
  cons: string[]
  bestFor: string[]
}

const poolOptions: PoolOption[] = [
  {
    name: "Above-Ground Pool",
    type: "Above-Ground",
    cost: { min: 3000, max: 15000 },
    lifespan: "7-15 years",
    maintenance: "Low",
    installTime: "1-3 days",
    pros: [
      "Most affordable option",
      "Quick installation",
      "Portable - can move if you relocate",
      "No excavation required",
      "Lower insurance costs",
    ],
    cons: [
      "Less durable than in-ground",
      "Limited design options",
      "Lower resale value",
      "Visible structure may not suit all aesthetics",
    ],
    bestFor: ["Budget-conscious buyers", "Renters", "Temporary solutions", "Small yards"],
  },
  {
    name: "Semi-In-Ground Pool",
    type: "Semi-In-Ground",
    cost: { min: 10000, max: 25000 },
    lifespan: "15-20 years",
    maintenance: "Medium",
    installTime: "1-2 weeks",
    pros: [
      "More aesthetic than above-ground",
      "Easier installation than full in-ground",
      "Better insulation than above-ground",
      "Can add decking for seamless look",
    ],
    cons: [
      "Still requires some excavation",
      "Limited depth options",
      "Not as durable as in-ground",
      "Moderate resale value impact",
    ],
    bestFor: ["Sloped yards", "Moderate budgets", "Homeowners wanting compromise", "Rocky terrain"],
  },
  {
    name: "In-Ground Pool",
    type: "In-Ground",
    cost: { min: 30000, max: 100000 },
    lifespan: "25+ years",
    maintenance: "High",
    installTime: "6-12 weeks",
    pros: [
      "Highest property value increase",
      "Unlimited design possibilities",
      "Most durable and long-lasting",
      "Premium aesthetic appeal",
      "Can be any depth",
    ],
    cons: [
      "Highest upfront cost",
      "Lengthy installation process",
      "Permanent - cannot relocate",
      "Higher insurance and maintenance costs",
      "Requires permits and inspections",
    ],
    bestFor: ["Long-term homeowners", "Luxury properties", "Large budgets", "Custom designs"],
  },
]

export default function PoolComparison() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Above-Ground Pool", "In-Ground Pool"])

  const toggleOption = (name: string) => {
    if (selectedOptions.includes(name)) {
      if (selectedOptions.length > 1) {
        setSelectedOptions(selectedOptions.filter((opt) => opt !== name))
      }
    } else {
      if (selectedOptions.length < 3) {
        setSelectedOptions([...selectedOptions, name])
      }
    }
  }

  const displayedOptions = poolOptions.filter((opt) => selectedOptions.includes(opt.name))

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Compare Pool Types</CardTitle>
        <CardDescription className="text-muted-foreground">
          Side-by-side comparison to help you choose the right pool type
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {poolOptions.map((option) => (
            <Button
              key={option.name}
              variant={selectedOptions.includes(option.name) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleOption(option.name)}
              className="text-sm"
            >
              {option.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedOptions.map((option) => (
            <Card key={option.name} className="border-primary/30 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-card-foreground">{option.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    ${option.cost.min.toLocaleString()} - ${option.cost.max.toLocaleString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Lifespan</p>
                    <p className="text-sm font-medium text-foreground">{option.lifespan}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Install Time</p>
                    <p className="text-sm font-medium text-foreground">{option.installTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Maintenance</p>
                    <Badge
                      variant="outline"
                      className={
                        option.maintenance === "Low"
                          ? "bg-green-500/10 text-green-500 border-green-500/30"
                          : option.maintenance === "Medium"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                            : "bg-red-500/10 text-red-500 border-red-500/30"
                      }
                    >
                      {option.maintenance}
                    </Badge>
                  </div>
                </div>

                {/* Pros */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-500" />
                    Advantages
                  </h4>
                  <ul className="space-y-1">
                    {option.pros.map((pro, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                    <X className="w-4 h-4 text-red-500" />
                    Disadvantages
                  </h4>
                  <ul className="space-y-1">
                    {option.cons.map((con, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best For */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Best For</h4>
                  <div className="flex flex-wrap gap-1">
                    {option.bestFor.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
