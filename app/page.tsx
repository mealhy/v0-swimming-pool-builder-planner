import PoolPlannerWizard from "@/components/pool-planner-wizard"
import PoolComparison from "@/components/pool-comparison"
import ConstructionGuide from "@/components/construction-guide"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-balance mb-4 text-foreground">
            DIY Swimming Pool Builder Planner
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Plan, budget, and build your dream swimming pool with our comprehensive step-by-step guide. Get material
            lists, cost estimates, and construction timelines.
          </p>
        </div>

        <div className="mb-12">
          <ConstructionGuide />
        </div>

        <div className="mb-8">
          <PoolComparison />
        </div>

        <PoolPlannerWizard />
      </div>
    </main>
  )
}
