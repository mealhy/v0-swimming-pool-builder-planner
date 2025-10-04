"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { PoolPlanData, Material } from "@/lib/types"
import { ShoppingCart, ExternalLink, Package } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MaterialChecklistProps {
  data: PoolPlanData
}

export default function MaterialChecklist({ data }: MaterialChecklistProps) {
  // Generate materials based on pool configuration
  const getMaterials = (): Material[] => {
    const materials: Material[] = []

    // Base materials for all pools
    materials.push({
      name: "Pool Pump & Filter System",
      quantity: "1 set",
      estimatedCost: 450,
      affiliateLink: "https://amazon.com/dp/EXAMPLE1?tag=youraffid-20",
      category: "Equipment",
    })

    materials.push({
      name: "Pool Test Kit & Chemicals",
      quantity: "1 kit",
      estimatedCost: 85,
      affiliateLink: "https://amazon.com/dp/EXAMPLE2?tag=youraffid-20",
      category: "Maintenance",
    })

    materials.push({
      name: "Pool Vacuum & Cleaning Kit",
      quantity: "1 set",
      estimatedCost: 120,
      affiliateLink: "https://amazon.com/dp/EXAMPLE3?tag=youraffid-20",
      category: "Maintenance",
    })

    // Type-specific materials
    if (data.poolType === "In-Ground") {
      materials.push(
        {
          name: "Rebar Steel Reinforcement",
          quantity: "200-300 ft",
          estimatedCost: 250,
          affiliateLink: "https://amazon.com/dp/EXAMPLE4?tag=youraffid-20",
          category: "Structure",
        },
        {
          name: "Concrete Mix (80lb bags)",
          quantity: "50-100 bags",
          estimatedCost: 400,
          affiliateLink: "https://amazon.com/dp/EXAMPLE5?tag=youraffid-20",
          category: "Structure",
        },
        {
          name: "Waterproof Sealant",
          quantity: "5-10 gallons",
          estimatedCost: 180,
          affiliateLink: "https://amazon.com/dp/EXAMPLE6?tag=youraffid-20",
          category: "Structure",
        },
      )
    } else if (data.poolType === "Above-Ground") {
      materials.push(
        {
          name: "Above-Ground Pool Kit",
          quantity: "1 complete kit",
          estimatedCost: 1200,
          affiliateLink: "https://amazon.com/dp/EXAMPLE7?tag=youraffid-20",
          category: "Structure",
        },
        {
          name: "Pool Ladder",
          quantity: "1 unit",
          estimatedCost: 150,
          affiliateLink: "https://amazon.com/dp/EXAMPLE8?tag=youraffid-20",
          category: "Safety",
        },
      )
    }

    // Finish-specific materials
    if (data.finish === "Vinyl Liner") {
      materials.push({
        name: "Vinyl Pool Liner",
        quantity: "1 liner",
        estimatedCost: 800,
        affiliateLink: "https://amazon.com/dp/EXAMPLE9?tag=youraffid-20",
        category: "Finish",
      })
    } else if (data.finish === "Tile") {
      materials.push(
        {
          name: "Pool Tiles (sq ft)",
          quantity: "400-800 sq ft",
          estimatedCost: 2500,
          affiliateLink: "https://amazon.com/dp/EXAMPLE10?tag=youraffid-20",
          category: "Finish",
        },
        {
          name: "Tile Adhesive & Grout",
          quantity: "10-15 bags",
          estimatedCost: 300,
          affiliateLink: "https://amazon.com/dp/EXAMPLE11?tag=youraffid-20",
          category: "Finish",
        },
      )
    } else if (data.finish === "Pebble") {
      materials.push({
        name: "Pebble Finish Mix",
        quantity: "50-80 bags",
        estimatedCost: 1800,
        affiliateLink: "https://amazon.com/dp/EXAMPLE12?tag=youraffid-20",
        category: "Finish",
      })
    }

    // Extras materials
    if (data.extras?.includes("LED Pool Lights")) {
      materials.push({
        name: "LED Pool Light Set",
        quantity: "2-4 lights",
        estimatedCost: 250,
        affiliateLink: "https://amazon.com/dp/EXAMPLE13?tag=youraffid-20",
        category: "Extras",
      })
    }

    if (data.extras?.includes("Heating System")) {
      materials.push({
        name: "Pool Heater",
        quantity: "1 unit",
        estimatedCost: 1800,
        affiliateLink: "https://amazon.com/dp/EXAMPLE14?tag=youraffid-20",
        category: "Extras",
      })
    }

    if (data.extras?.includes("Pool Cover")) {
      materials.push({
        name: "Pool Safety Cover",
        quantity: "1 cover",
        estimatedCost: 450,
        affiliateLink: "https://amazon.com/dp/EXAMPLE15?tag=youraffid-20",
        category: "Safety",
      })
    }

    if (data.extras?.includes("Pool Fence")) {
      materials.push({
        name: "Pool Safety Fence Kit",
        quantity: "40-60 ft",
        estimatedCost: 800,
        affiliateLink: "https://amazon.com/dp/EXAMPLE16?tag=youraffid-20",
        category: "Safety",
      })
    }

    if (data.extras?.includes("Saltwater System")) {
      materials.push({
        name: "Salt Chlorine Generator",
        quantity: "1 system",
        estimatedCost: 650,
        affiliateLink: "https://amazon.com/dp/EXAMPLE17?tag=youraffid-20",
        category: "Equipment",
      })
    }

    if (data.extras?.includes("Water Jets")) {
      materials.push({
        name: "Pool Water Jets",
        quantity: "2-4 jets",
        estimatedCost: 380,
        affiliateLink: "https://amazon.com/dp/EXAMPLE18?tag=youraffid-20",
        category: "Extras",
      })
    }

    // Essential tools
    materials.push(
      {
        name: "Heavy Duty Shovel Set",
        quantity: "2-3 shovels",
        estimatedCost: 90,
        affiliateLink: "https://amazon.com/dp/EXAMPLE19?tag=youraffid-20",
        category: "Tools",
      },
      {
        name: "Level & Measuring Tools",
        quantity: "1 set",
        estimatedCost: 65,
        affiliateLink: "https://amazon.com/dp/EXAMPLE20?tag=youraffid-20",
        category: "Tools",
      },
      {
        name: "Safety Equipment (Gloves, Goggles)",
        quantity: "1 set",
        estimatedCost: 45,
        affiliateLink: "https://amazon.com/dp/EXAMPLE21?tag=youraffid-20",
        category: "Safety",
      },
    )

    return materials
  }

  const materials = getMaterials()
  const categories = Array.from(new Set(materials.map((m) => m.category)))
  const totalCost = materials.reduce((sum, m) => sum + m.estimatedCost, 0)

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground">Materials & Tools Checklist</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Complete shopping list with Amazon affiliate links - Total: ${totalCost.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-6 bg-secondary">
            <TabsTrigger
              value="all"
              className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All
            </TabsTrigger>
            {categories.slice(0, 6).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {materials.map((material, index) => (
              <MaterialCard key={index} material={material} />
            ))}
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-3">
              {materials
                .filter((m) => m.category === category)
                .map((material, index) => (
                  <MaterialCard key={index} material={material} />
                ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Bulk Purchase CTA */}
        <Card className="mt-6 p-4 bg-primary/10 border-primary/50">
          <div className="flex items-start gap-4">
            <ShoppingCart className="w-6 h-6 text-primary mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">Ready to Start Shopping?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get all your pool materials delivered to your door. Click the links above to purchase individual items,
                or export your complete shopping list.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Export Shopping List
              </Button>
            </div>
          </div>
        </Card>
      </CardContent>
    </Card>
  )
}

function MaterialCard({ material }: { material: Material }) {
  return (
    <Card className="p-4 border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{material.name}</h4>
            <Badge variant="outline" className="text-xs border-primary/50 text-muted-foreground">
              {material.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Quantity: {material.quantity}</p>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-primary">${material.estimatedCost}</span>
            <Button
              size="sm"
              variant="outline"
              className="text-foreground border-primary/50 hover:bg-primary hover:text-primary-foreground bg-transparent"
              asChild
            >
              <a href={material.affiliateLink} target="_blank" rel="noopener noreferrer">
                Buy on Amazon
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
