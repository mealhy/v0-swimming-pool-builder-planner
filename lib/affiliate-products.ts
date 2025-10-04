export interface AffiliateProduct {
  id: string
  name: string
  category: "pump" | "filter" | "heater" | "cleaner" | "chemicals" | "cover" | "lighting" | "accessories"
  price: number
  rating: number
  reviews: number
  image: string
  description: string
  features: string[]
  affiliateLink: string
  bestFor: string[]
}

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: "pump-1",
    name: "Hayward Super Pump VS Variable Speed",
    category: "pump",
    price: 899,
    rating: 4.7,
    reviews: 1243,
    image: "/pool-pump.jpg",
    description: "Energy-efficient variable speed pump that can save up to 90% on energy costs",
    features: ["Variable speed technology", "Ultra-quiet operation", "ENERGY STAR certified", "Self-priming"],
    affiliateLink: "#",
    bestFor: ["In-Ground", "Medium", "Large"],
  },
  {
    id: "pump-2",
    name: "Intex Krystal Clear Sand Filter Pump",
    category: "pump",
    price: 249,
    rating: 4.3,
    reviews: 892,
    image: "/sand-filter-pump.jpg",
    description: "Affordable sand filter pump system perfect for above-ground pools",
    features: ["Sand filtration", "Easy maintenance", "2,100 GPH flow rate", "Built-in timer"],
    affiliateLink: "#",
    bestFor: ["Above-Ground", "Small", "Medium"],
  },
  {
    id: "filter-1",
    name: "Pentair Clean & Clear Cartridge Filter",
    category: "filter",
    price: 549,
    rating: 4.6,
    reviews: 756,
    image: "/cartridge-filter.jpg",
    description: "High-performance cartridge filter with superior dirt-holding capacity",
    features: ["420 sq ft filtration area", "Easy cartridge cleaning", "Durable construction", "Chemical resistant"],
    affiliateLink: "#",
    bestFor: ["In-Ground", "Semi-In-Ground"],
  },
  {
    id: "heater-1",
    name: "Hayward HeatPro Heat Pump",
    category: "heater",
    price: 2499,
    rating: 4.8,
    reviews: 432,
    image: "/pool-heat-pump.jpg",
    description: "Efficient heat pump that extends your swimming season at low operating cost",
    features: ["Titanium heat exchanger", "Digital controls", "Quiet operation", "Eco-friendly refrigerant"],
    affiliateLink: "#",
    bestFor: ["In-Ground", "Large"],
  },
  {
    id: "heater-2",
    name: "SunHeater Solar Pool Heating System",
    category: "heater",
    price: 349,
    rating: 4.4,
    reviews: 1089,
    image: "/solar-pool-heater.jpg",
    description: "Eco-friendly solar heating system with zero operating costs",
    features: ["Solar powered", "No operating costs", "Easy DIY installation", "Durable polypropylene"],
    affiliateLink: "#",
    bestFor: ["Above-Ground", "Small", "Medium"],
  },
  {
    id: "cleaner-1",
    name: "Dolphin Nautilus CC Plus Robotic Cleaner",
    category: "cleaner",
    price: 799,
    rating: 4.7,
    reviews: 2341,
    image: "/robotic-pool-cleaner.jpg",
    description: "Top-rated robotic pool cleaner that scrubs, vacuums, and filters automatically",
    features: ["Cleans floor, walls, waterline", "2-hour cleaning cycle", "Easy-clean filter", "Tangle-free cable"],
    affiliateLink: "#",
    bestFor: ["In-Ground", "Medium", "Large"],
  },
  {
    id: "chemicals-1",
    name: "Taylor Complete Pool Test Kit",
    category: "chemicals",
    price: 89,
    rating: 4.9,
    reviews: 3421,
    image: "/pool-test-kit.jpg",
    description: "Professional-grade testing kit for accurate water chemistry monitoring",
    features: ["Tests 9 parameters", "Lab-quality accuracy", "Includes reagents", "Detailed instructions"],
    affiliateLink: "#",
    bestFor: ["All pool types"],
  },
  {
    id: "cover-1",
    name: "Blue Wave Solar Blanket",
    category: "cover",
    price: 129,
    rating: 4.5,
    reviews: 1876,
    image: "/solar-pool-cover.jpg",
    description: "Solar blanket that heats water and reduces evaporation by 95%",
    features: ["Raises water temp 15°F", "Reduces chemical use", "UV resistant", "Multiple sizes available"],
    affiliateLink: "#",
    bestFor: ["All pool types"],
  },
  {
    id: "lighting-1",
    name: "Pentair IntelliBrite LED Pool Light",
    category: "lighting",
    price: 449,
    rating: 4.8,
    reviews: 654,
    image: "/led-pool-light.jpg",
    description: "Energy-efficient LED lighting with 5 vibrant colors and 7 light shows",
    features: ["5 colors + 7 shows", "86% more efficient", "50,000 hour lifespan", "Universal fit"],
    affiliateLink: "#",
    bestFor: ["In-Ground"],
  },
]

export function getRecommendedProducts(poolType: string, size: string, extras: string[]): AffiliateProduct[] {
  return affiliateProducts.filter((product) => {
    // Match pool type
    if (product.bestFor.includes(poolType)) return true
    // Match size
    if (product.bestFor.includes(size)) return true
    // Match all pools
    if (product.bestFor.includes("All pool types")) return true
    return false
  })
}
