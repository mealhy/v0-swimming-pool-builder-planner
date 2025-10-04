"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, ShoppingCart } from "lucide-react"
import type { PoolPlanData } from "@/lib/types"
import { getRecommendedProducts } from "@/lib/affiliate-products"
import Image from "next/image"

interface ProductRecommendationsProps {
  data: PoolPlanData
}

export default function ProductRecommendations({ data }: ProductRecommendationsProps) {
  const recommendedProducts = getRecommendedProducts(data.poolType, data.size, data.extras)

  // Group by category
  const productsByCategory = recommendedProducts.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    },
    {} as Record<string, typeof recommendedProducts>,
  )

  const categoryNames: Record<string, string> = {
    pump: "Pumps & Circulation",
    filter: "Filtration Systems",
    heater: "Heating Solutions",
    cleaner: "Pool Cleaners",
    chemicals: "Water Testing & Chemicals",
    cover: "Pool Covers",
    lighting: "Lighting",
    accessories: "Accessories",
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground">Recommended Products</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Top-rated products matched to your pool specifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {Object.entries(productsByCategory).map(([category, products]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{categoryNames[category]}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="border-border bg-card overflow-hidden">
                  <div className="relative h-48 bg-secondary">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground line-clamp-2 mb-2">{product.name}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm font-medium text-foreground">{product.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">${product.price}</p>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full" asChild>
                      <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                        View Product
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <Card className="p-4 bg-secondary/50 border-border">
          <p className="text-xs text-muted-foreground">
            <strong>Disclosure:</strong> We may earn a commission from purchases made through these affiliate links at
            no additional cost to you. All products are independently selected based on quality and customer reviews.
          </p>
        </Card>
      </CardContent>
    </Card>
  )
}
