export interface PoolPlanData {
  location: string
  soilType: string
  shape: string
  size: string
  customLength: number
  customWidth: number
  customDepth: number
  poolType: string
  finish: string
  extras: string[]
}

export interface Material {
  name: string
  quantity: string
  estimatedCost: number
  affiliateLink: string
  category: string
}

export interface TimelinePhase {
  name: string
  duration: string
  description: string
}
