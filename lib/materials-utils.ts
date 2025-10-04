import type { PoolPlanData } from "./types"

export function getMaterialsList(data: PoolPlanData) {
  const isInGround = data.poolType === "In-Ground" || data.poolType === "Semi-In-Ground"

  const materials: Record<string, Array<{ name: string; price: number }>> = {
    "Excavation & Structure": [],
  }

  if (isInGround) {
    materials["Excavation & Structure"].push(
      { name: "Excavation Service", price: 3500 },
      { name: "Steel Rebar (100 pieces)", price: 450 },
      { name: "Concrete Mix (80 bags)", price: 640 },
      { name: "Waterproof Membrane", price: 380 },
    )
  } else {
    materials["Excavation & Structure"].push(
      { name: "Pool Kit", price: 2800 },
      { name: "Ground Leveling Sand", price: 120 },
      { name: "Base Pads", price: 85 },
    )
  }

  materials["Plumbing & Filtration"] = [
    { name: "Pool Pump (1.5 HP)", price: 450 },
    { name: "Sand Filter System", price: 380 },
    { name: "PVC Pipes & Fittings", price: 220 },
    { name: "Pool Skimmer", price: 95 },
    { name: "Return Jets (4 pack)", price: 68 },
  ]

  materials["Surface Finish"] = []
  const finishMaterials: Record<string, Array<{ name: string; price: number }>> = {
    "Vinyl Liner": [{ name: "Vinyl Pool Liner", price: 1800 }],
    Fiberglass: [{ name: "Fiberglass Shell", price: 7500 }],
    Concrete: [{ name: "Pool Plaster", price: 2400 }],
    Tiles: [
      { name: "Pool Tiles (500 sq ft)", price: 3800 },
      { name: "Tile Adhesive", price: 280 },
    ],
    Pebble: [{ name: "Pebble Finish Mix", price: 2800 }],
  }
  materials["Surface Finish"] = finishMaterials[data.finish as keyof typeof finishMaterials] || []

  materials["Safety & Accessories"] = [
    { name: "Pool Ladder", price: 185 },
    { name: "Safety Fence (per ft)", price: 25 },
    { name: "Pool Cover", price: 320 },
    { name: "Life Ring & Hook", price: 45 },
  ]

  materials["Chemicals & Maintenance"] = [
    { name: "Startup Chemical Kit", price: 120 },
    { name: "Pool Test Kit", price: 35 },
    { name: "Pool Vacuum", price: 180 },
    { name: "Skimmer Net", price: 28 },
  ]

  // Add extras
  if (data.extras?.includes("LED Pool Lights")) {
    materials["Electrical"] = materials["Electrical"] || []
    materials["Electrical"].push({ name: "LED Pool Light Set (4)", price: 680 })
  }

  if (data.extras?.includes("Pool Heater")) {
    materials["Heating"] = materials["Heating"] || []
    materials["Heating"].push({ name: "Pool Heat Pump", price: 3200 })
  }

  return materials
}
