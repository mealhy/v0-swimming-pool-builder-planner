import type { PoolPlanData } from "./types"

export function calculateBudget(data: PoolPlanData) {
  let baseCost = 0

  // Base cost by pool type
  const typeCosts = {
    "Above-Ground": 3000,
    "In-Ground": 25000,
    "Semi-In-Ground": 15000,
  }
  baseCost = typeCosts[data.poolType as keyof typeof typeCosts] || 15000

  // Size multiplier
  const sizeMultipliers = {
    "Small (10' x 20')": 0.6,
    "Medium (15' x 30')": 1.0,
    "Large (20' x 40')": 1.5,
    Custom: 1.2,
  }
  const sizeMultiplier = sizeMultipliers[data.size as keyof typeof sizeMultipliers] || 1.0
  baseCost *= sizeMultiplier

  // Finish costs
  const finishCosts = {
    "Vinyl Liner": 2000,
    Fiberglass: 8000,
    Concrete: 12000,
    Tiles: 15000,
    Pebble: 10000,
  }
  const finishCost = finishCosts[data.finish as keyof typeof finishCosts] || 5000

  // Extras costs
  let extrasCost = 0
  const extraPrices: Record<string, number> = {
    "LED Pool Lights": 800,
    "Pool Heater": 3500,
    "Water Jets": 1200,
    "Diving Board": 1500,
    "Pool Slide": 2500,
    "Automatic Pool Cover": 4000,
    "Salt Water System": 2000,
    "Pool Deck": 8000,
    Landscaping: 5000,
    "Pool House": 15000,
  }

  data.extras?.forEach((extra) => {
    extrasCost += extraPrices[extra] || 0
  })

  // Soil adjustment
  const soilMultipliers = {
    Clay: 1.2,
    Sand: 0.9,
    Rocky: 1.4,
    Loam: 1.0,
  }
  const soilMultiplier = soilMultipliers[data.soilType as keyof typeof soilMultipliers] || 1.0

  const excavation = baseCost * 0.15 * soilMultiplier
  const plumbing = baseCost * 0.12
  const electrical = baseCost * 0.08
  const equipment = baseCost * 0.2
  const labor = baseCost * 0.25

  const total = Math.round(baseCost + finishCost + extrasCost + excavation + plumbing + electrical + equipment + labor)

  return {
    total,
    breakdown: {
      "Base Construction": Math.round(baseCost),
      "Surface Finish": finishCost,
      Excavation: Math.round(excavation),
      Plumbing: Math.round(plumbing),
      Electrical: Math.round(electrical),
      Equipment: Math.round(equipment),
      Labor: Math.round(labor),
      "Additional Features": extrasCost,
    },
  }
}
