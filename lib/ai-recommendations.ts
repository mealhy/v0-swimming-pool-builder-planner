import type { PoolPlanData } from "./types"

export interface Recommendation {
  title: string
  description: string
  reason: string
  priority: "high" | "medium" | "low"
  category: "type" | "size" | "finish" | "extras" | "budget"
}

export function generateRecommendations(data: PoolPlanData): Recommendation[] {
  const recommendations: Recommendation[] = []

  // Soil-based recommendations
  if (data.soilType === "Clay") {
    recommendations.push({
      title: "Consider In-Ground Pool",
      description: "Clay soil provides excellent stability for in-ground pools with minimal shifting.",
      reason: "Clay soil is dense and stable, making it ideal for in-ground construction.",
      priority: "high",
      category: "type",
    })
    recommendations.push({
      title: "Add Proper Drainage System",
      description: "Clay soil retains water, so a robust drainage system is essential.",
      reason: "Prevents water accumulation around the pool structure.",
      priority: "high",
      category: "extras",
    })
  }

  if (data.soilType === "Sandy") {
    recommendations.push({
      title: "Reinforce Pool Structure",
      description: "Sandy soil may shift over time. Consider additional reinforcement and deeper footings.",
      reason: "Sandy soil is less stable and requires extra structural support.",
      priority: "high",
      category: "type",
    })
  }

  if (data.soilType === "Rocky") {
    recommendations.push({
      title: "Budget for Excavation Costs",
      description: "Rocky terrain requires specialized equipment and may increase excavation costs by 30-50%.",
      reason: "Rock removal is labor-intensive and requires heavy machinery.",
      priority: "high",
      category: "budget",
    })
    recommendations.push({
      title: "Consider Above-Ground Option",
      description: "An above-ground pool could save significant excavation costs in rocky terrain.",
      reason: "Avoids expensive rock removal and excavation challenges.",
      priority: "medium",
      category: "type",
    })
  }

  // Location-based recommendations
  if (data.location === "Backyard") {
    recommendations.push({
      title: "Add Privacy Fencing",
      description: "Enhance privacy and safety with decorative fencing around your backyard pool.",
      reason: "Provides security and creates a private oasis.",
      priority: "medium",
      category: "extras",
    })
  }

  if (data.location === "Side Yard") {
    recommendations.push({
      title: "Optimize for Narrow Spaces",
      description: "Consider a lap pool or rectangular design to maximize your side yard space.",
      reason: "Side yards are typically narrower and benefit from elongated designs.",
      priority: "high",
      category: "size",
    })
  }

  // Size and budget recommendations
  if (data.size === "Large (25x50 ft)" || (data.customLength && data.customLength > 40)) {
    recommendations.push({
      title: "Install Automated Pool Cleaner",
      description: "Large pools benefit significantly from automated cleaning systems.",
      reason: "Reduces maintenance time and ensures consistent cleanliness.",
      priority: "medium",
      category: "extras",
    })
    recommendations.push({
      title: "Consider Energy-Efficient Heating",
      description: "Large pools require substantial heating. Solar or heat pump systems offer long-term savings.",
      reason: "Reduces ongoing energy costs for large water volumes.",
      priority: "high",
      category: "extras",
    })
  }

  // Pool type recommendations
  if (data.poolType === "Above-Ground") {
    recommendations.push({
      title: "Add Decking for Aesthetics",
      description:
        "Wooden or composite decking dramatically improves the look and accessibility of above-ground pools.",
      reason: "Creates a seamless transition and enhances visual appeal.",
      priority: "high",
      category: "extras",
    })
  }

  if (data.poolType === "In-Ground") {
    recommendations.push({
      title: "Invest in Quality Waterproofing",
      description: "Professional-grade waterproofing prevents costly repairs and extends pool life.",
      reason: "In-ground pools are more susceptible to water damage and leaks.",
      priority: "high",
      category: "finish",
    })
  }

  // Finish recommendations
  if (data.finish === "Vinyl Liner") {
    recommendations.push({
      title: "Plan for Liner Replacement",
      description: "Vinyl liners typically last 7-10 years. Budget $3,000-$5,000 for future replacement.",
      reason: "Vinyl liners have a limited lifespan compared to other finishes.",
      priority: "medium",
      category: "budget",
    })
  }

  if (data.finish === "Tile") {
    recommendations.push({
      title: "Choose Slip-Resistant Tiles",
      description: "Prioritize safety with textured, slip-resistant tile options for pool surfaces.",
      reason: "Wet tile surfaces can be hazardous without proper texture.",
      priority: "high",
      category: "finish",
    })
  }

  // Safety recommendations
  if (!data.extras.includes("Safety Fence")) {
    recommendations.push({
      title: "Install Safety Fencing (Required)",
      description: "Most jurisdictions require 4-foot fencing with self-closing gates around pools.",
      reason: "Legal requirement and critical safety feature, especially with children.",
      priority: "high",
      category: "extras",
    })
  }

  if (!data.extras.includes("Pool Cover")) {
    recommendations.push({
      title: "Add a Pool Cover",
      description: "Reduces evaporation, keeps debris out, and improves safety when pool is not in use.",
      reason: "Saves on water, chemicals, and heating costs while enhancing safety.",
      priority: "medium",
      category: "extras",
    })
  }

  // LED lighting recommendation
  if (!data.extras.includes("LED Lighting") && data.poolType === "In-Ground") {
    recommendations.push({
      title: "Install LED Pool Lighting",
      description: "LED lights enhance ambiance, safety, and extend usable hours into the evening.",
      reason: "Energy-efficient lighting improves aesthetics and nighttime safety.",
      priority: "medium",
      category: "extras",
    })
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
}
