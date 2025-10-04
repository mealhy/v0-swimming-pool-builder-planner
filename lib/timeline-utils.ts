import type { PoolPlanData } from "./types"

export function getTimelinePhases(data: PoolPlanData) {
  const isInGround = data.poolType === "In-Ground" || data.poolType === "Semi-In-Ground"

  const phases = [
    {
      phase: "Planning & Permits",
      duration: "7-14 days",
      notes: "Obtain necessary permits and finalize design",
    },
    {
      phase: "Site Preparation",
      duration: isInGround ? "3-5 days" : "1-2 days",
      notes: "Clear area, mark utilities, prepare ground",
    },
  ]

  if (isInGround) {
    phases.push({
      phase: "Excavation",
      duration: data.soilType === "Rocky" ? "5-7 days" : "3-5 days",
      notes: data.soilType === "Rocky" ? "Rocky soil requires additional time" : "Dig pool cavity",
    })
  }

  phases.push(
    {
      phase: "Structural Work",
      duration: isInGround ? "7-10 days" : "2-3 days",
      notes: isInGround ? "Steel reinforcement, concrete/fiberglass installation" : "Pool assembly and setup",
    },
    {
      phase: "Plumbing & Electrical",
      duration: "5-7 days",
      notes: "Install filtration, pumps, lighting, and heating systems",
    },
    {
      phase: "Surface Finishing",
      duration: data.finish === "Tiles" ? "7-10 days" : "3-5 days",
      notes: `Apply ${data.finish} finish`,
    },
    {
      phase: "Decking & Landscaping",
      duration: data.extras?.includes("Pool Deck") ? "7-10 days" : "3-5 days",
      notes: "Complete surrounding area",
    },
    {
      phase: "Filling & Testing",
      duration: "2-3 days",
      notes: "Fill pool, balance chemicals, test all systems",
    },
    {
      phase: "Final Inspection",
      duration: "1-2 days",
      notes: "Official inspection and approval",
    },
  )

  return phases
}
