"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shovel,
  Wrench,
  Droplets,
  Hammer,
  Paintbrush,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Shield,
  HardHat,
} from "lucide-react"

interface ConstructionStep {
  id: string
  title: string
  duration: string
  difficulty: "Easy" | "Medium" | "Hard" | "Expert"
  icon: any
  description: string
  detailedSteps: string[]
  toolsNeeded: string[]
  materialsNeeded: string[]
  safetyWarnings: string[]
  proTips: string[]
  commonMistakes: string[]
  estimatedCost: string
  laborRequired: string
}

const constructionSteps: ConstructionStep[] = [
  {
    id: "permits",
    title: "Obtain Permits & Plan Approval",
    duration: "1-4 weeks",
    difficulty: "Easy",
    icon: CheckCircle2,
    description:
      "Before breaking ground, secure all necessary permits and approvals from local authorities. This crucial step ensures your pool meets building codes and zoning requirements.",
    detailedSteps: [
      "Contact your local building department to understand permit requirements",
      "Submit detailed pool plans including dimensions, depth, and equipment locations",
      "Include site plans showing property lines, setbacks, and utility locations",
      "Schedule and pass any required inspections (zoning, setback verification)",
      "Obtain homeowner association approval if applicable",
      "Call 811 to mark underground utilities before any digging",
      "Purchase liability insurance for the construction period",
      "Post permits visibly at the construction site",
    ],
    toolsNeeded: ["Measuring tape", "Camera for documentation", "Computer for applications"],
    materialsNeeded: ["Permit application forms", "Site survey documents", "Pool design plans"],
    safetyWarnings: [
      "Never skip the permit process - unpermitted pools can result in fines and forced removal",
      "Hitting underground utilities can cause serious injury or death",
      "Verify all property lines to avoid encroachment issues",
    ],
    proTips: [
      "Start the permit process early - it can take weeks or months",
      "Build relationships with inspectors - they can provide valuable guidance",
      "Keep copies of all permits and approvals in a waterproof folder on-site",
      "Take photos of the site before construction begins for documentation",
    ],
    commonMistakes: [
      "Starting construction before permits are approved",
      "Not calling 811 to locate utilities",
      "Ignoring setback requirements from property lines",
      "Failing to notify neighbors about construction",
    ],
    estimatedCost: "$500 - $2,000",
    laborRequired: "Homeowner can handle paperwork",
  },
  {
    id: "excavation",
    title: "Excavation & Site Preparation",
    duration: "2-5 days",
    difficulty: "Hard",
    icon: Shovel,
    description:
      "Excavate the pool area to the proper depth and shape. This is one of the most critical phases as it establishes the foundation for your entire pool.",
    detailedSteps: [
      "Mark the exact pool outline using stakes and string or spray paint",
      "Add 2-3 feet extra around perimeter for working space and walls",
      "Remove topsoil and vegetation from the entire work area",
      "Begin excavation with heavy equipment (backhoe or excavator)",
      "Dig to proper depth: shallow end first, then slope to deep end",
      "Create level bottom and smooth walls - check frequently with level",
      "Dig trenches for plumbing lines (main drain, skimmers, returns)",
      "Excavate areas for steps, benches, or special features",
      "Remove all rocks, roots, and debris from the hole",
      "Compact the soil at the bottom to prevent settling",
      "Create proper drainage around the pool perimeter",
      "Stockpile good soil for backfilling later",
    ],
    toolsNeeded: [
      "Excavator or backhoe (rental)",
      "Laser level or transit",
      "Measuring tape (100ft)",
      "Stakes and string",
      "Shovels and rakes",
      "Wheelbarrow",
      "Plate compactor",
    ],
    materialsNeeded: ["Spray paint for marking", "Gravel for drainage (2-3 tons)", "Sand for leveling (1-2 tons)"],
    safetyWarnings: [
      "CRITICAL: Call 811 before digging to locate underground utilities",
      "Keep people and pets away from excavation site",
      "Shore up walls if soil is unstable - cave-ins can be fatal",
      "Watch for underground water springs that can destabilize the hole",
      "Never enter a deep excavation alone",
      "Fence off the excavation immediately to prevent falls",
    ],
    proTips: [
      "Rent equipment for multiple days - rushing leads to mistakes",
      "Dig slightly deeper than needed, then add compacted sand for perfect leveling",
      "Take photos and measurements at every stage for documentation",
      "Have a plan for disposing of excavated soil (can be 50+ cubic yards)",
      "Check weather forecast - rain can flood the excavation",
      "Over-excavate by 6 inches and backfill with gravel for better drainage",
    ],
    commonMistakes: [
      "Not digging wide enough around the pool for wall installation",
      "Creating an uneven bottom that causes water pooling",
      "Hitting utility lines due to not calling 811",
      "Not compacting the bottom, leading to settling and cracks",
      "Ignoring drainage, causing water to collect around the pool",
    ],
    estimatedCost: "$2,000 - $5,000 (equipment rental + disposal)",
    laborRequired: "Professional excavator recommended, 2-3 workers",
  },
  {
    id: "plumbing",
    title: "Install Plumbing System",
    duration: "2-4 days",
    difficulty: "Expert",
    icon: Droplets,
    description:
      "Install all plumbing lines including main drain, skimmers, return jets, and equipment connections. Proper plumbing is essential for water circulation and filtration.",
    detailedSteps: [
      "Lay out all plumbing according to approved plans",
      "Install main drain at the deepest point of the pool",
      "Run 2-inch PVC pipe from main drain to equipment pad",
      "Install skimmer(s) at water line level (typically 2 for residential pools)",
      "Run suction lines from skimmers to pump location",
      "Install return jets (2-4 depending on pool size) evenly spaced",
      "Run return lines from equipment back to pool",
      "Install dedicated suction line for automatic pool cleaner",
      "Add ball valves at key points for maintenance and winterization",
      "Install check valves to prevent backflow",
      "Pressure test all lines at 30 PSI for 24 hours - check for leaks",
      "Glue all PVC connections with proper primer and cement",
      "Slope all lines slightly toward equipment for proper drainage",
      "Install safety vacuum release system (SVRS) if required by code",
    ],
    toolsNeeded: [
      "PVC pipe cutter",
      "PVC primer and cement",
      "Pressure gauge and test plugs",
      "Trenching shovel",
      "Level",
      "Hacksaw",
      "Measuring tape",
      "Marker",
    ],
    materialsNeeded: [
      "2-inch Schedule 40 PVC pipe (200-300 feet)",
      "1.5-inch PVC pipe for returns",
      "PVC fittings (elbows, tees, couplings)",
      "Ball valves (6-8)",
      "Check valves (2-3)",
      "Main drain assembly",
      "Skimmer boxes (1-2)",
      "Return jet fittings (4-6)",
      "PVC primer and cement",
      "Teflon tape",
    ],
    safetyWarnings: [
      "CRITICAL: Install anti-entrapment drain covers - required by law to prevent drowning",
      "Never use a single main drain - dual drains or SVRS required",
      "Ensure all electrical conduit is separate from plumbing",
      "PVC cement fumes are toxic - work in ventilated area",
      "Pressure test before backfilling - fixing leaks later is extremely expensive",
    ],
    proTips: [
      "Use flexible PVC for easier installation around curves",
      "Label all pipes before backfilling for future reference",
      "Take photos of all plumbing before covering with concrete",
      "Install unions at equipment for easy future replacement",
      "Oversize plumbing slightly (2.5-inch) for better flow and efficiency",
      "Install a dedicated line for water features or spa jets",
      "Use schedule 40 PVC - schedule 20 is not strong enough",
    ],
    commonMistakes: [
      "Not pressure testing before backfilling",
      "Using too many 90-degree elbows, restricting flow",
      "Improper gluing leading to leaks",
      "Not sloping lines for drainage",
      "Installing single main drain (illegal and dangerous)",
      "Forgetting to install valves for winterization",
    ],
    estimatedCost: "$1,500 - $3,500",
    laborRequired: "Licensed plumber strongly recommended, 2 workers",
  },
  {
    id: "steel",
    title: "Install Steel Reinforcement (Rebar)",
    duration: "2-3 days",
    difficulty: "Hard",
    icon: HardHat,
    description:
      "Create a steel reinforcement cage using rebar to strengthen the concrete shell. This structural framework prevents cracking and ensures long-term durability.",
    detailedSteps: [
      "Install vertical rebar stakes every 12-18 inches around pool perimeter",
      "Drive stakes 18-24 inches into ground for stability",
      "Attach horizontal rebar rings every 12 inches vertically",
      "Use #3 or #4 rebar (3/8-inch or 1/2-inch diameter)",
      "Wire tie all intersections securely with rebar tie wire",
      "Create a grid pattern on the pool floor (12-inch x 12-inch grid)",
      "Elevate floor rebar 2-3 inches off ground using rebar chairs",
      "Add extra reinforcement around steps, benches, and corners",
      "Install steel around all plumbing penetrations",
      "Ensure 3-inch minimum concrete cover over all rebar",
      "Add structural steel for any raised walls or bond beams",
      "Double-check all measurements and spacing before concrete",
    ],
    toolsNeeded: [
      "Rebar cutter or angle grinder",
      "Rebar bender",
      "Wire tying tool or pliers",
      "Measuring tape",
      "Level",
      "Hammer",
      "Safety glasses",
      "Work gloves",
    ],
    materialsNeeded: [
      "#3 or #4 rebar (500-800 linear feet)",
      "Rebar tie wire (2-3 rolls)",
      "Rebar chairs and supports",
      "Rebar stakes",
      "Wire mesh for floor (optional)",
    ],
    safetyWarnings: [
      "Wear heavy gloves - rebar edges are sharp and can cause serious cuts",
      "Use safety glasses when cutting rebar - metal fragments can cause eye injury",
      "Watch for protruding rebar ends - mark with bright caps",
      "Rebar is heavy - use proper lifting techniques to avoid back injury",
      "Keep work area clear of trip hazards",
    ],
    proTips: [
      "Overlap rebar sections by at least 18 inches and tie securely",
      "Use more rebar than minimum code - it's cheap insurance against cracks",
      "Keep rebar at least 3 inches from all surfaces for proper concrete cover",
      "Pre-bend rebar for curves and corners before installation",
      "Take photos of completed rebar cage before concrete for records",
      "In cold climates, use extra reinforcement to handle freeze-thaw cycles",
    ],
    commonMistakes: [
      "Insufficient rebar spacing leading to weak spots",
      "Rebar touching the ground or forms (needs concrete cover)",
      "Not tying intersections securely - rebar shifts during concrete pour",
      "Forgetting extra reinforcement around stress points",
      "Using rusty or damaged rebar",
    ],
    estimatedCost: "$800 - $1,500",
    laborRequired: "2-3 workers, can be DIY with research",
  },
  {
    id: "shotcrete",
    title: "Apply Shotcrete/Gunite Shell",
    duration: "1-2 days",
    difficulty: "Expert",
    icon: Hammer,
    description:
      "Spray concrete (shotcrete or gunite) over the rebar framework to create the structural shell of the pool. This requires specialized equipment and expertise.",
    detailedSteps: [
      "Hire professional shotcrete crew - this is NOT a DIY step",
      "Ensure rebar inspection is complete and approved",
      "Wet down the excavation to prevent soil from absorbing water from concrete",
      "Position shotcrete equipment and hoses",
      "Spray concrete in layers, working from bottom to top",
      "Maintain consistent 8-12 inch thickness throughout",
      "Compact concrete as it's sprayed to eliminate voids",
      "Create smooth transitions at corners and curves",
      "Form steps, benches, and special features",
      "Trowel surface smooth while concrete is workable",
      "Install bond beam at top of pool walls",
      "Ensure proper slope toward main drain (1/4 inch per foot)",
      "Keep concrete moist for 7 days (cure time) - spray with water daily",
      "Protect from freezing temperatures during curing",
    ],
    toolsNeeded: [
      "Shotcrete pump and equipment (professional crew brings)",
      "Trowels and floats",
      "Spray nozzles",
      "Air compressor",
      "Hoses",
    ],
    materialsNeeded: [
      "Shotcrete mix (15-20 cubic yards for average pool)",
      "Accelerator additives",
      "Fiber reinforcement (optional)",
      "Curing compound or plastic sheeting",
    ],
    safetyWarnings: [
      "HIRE PROFESSIONALS - shotcrete requires specialized training and equipment",
      "Concrete dust can cause respiratory issues - wear respirator",
      "High-pressure equipment can cause serious injury",
      "Wet concrete is caustic - wear protective clothing and gloves",
      "Keep all non-essential personnel away during spraying",
      "Ensure proper ventilation if working in enclosed area",
    ],
    proTips: [
      "Schedule shotcrete for mild weather (50-80°F) for best results",
      "Have extra workers ready to trowel and finish - concrete sets quickly",
      "Order 10% extra concrete - better to have too much than too little",
      "Take core samples after curing to verify thickness and quality",
      "Consider fiber-reinforced shotcrete for added crack resistance",
      "Cure properly - this is critical for strength and durability",
    ],
    commonMistakes: [
      "Attempting DIY shotcrete without proper equipment or training",
      "Insufficient thickness in walls or floor",
      "Not curing properly, leading to weak concrete and cracks",
      "Spraying in extreme temperatures",
      "Not compacting concrete, leaving voids and weak spots",
      "Rushing the finish work",
    ],
    estimatedCost: "$8,000 - $15,000 (professional crew)",
    laborRequired: "Professional shotcrete crew required, 4-6 workers",
  },
  {
    id: "tile",
    title: "Install Tile & Coping",
    duration: "3-5 days",
    difficulty: "Medium",
    icon: Paintbrush,
    description:
      "Install waterline tile and coping around the pool perimeter. This provides a finished look and protects the pool edge from wear and weather.",
    detailedSteps: [
      "Allow shotcrete to cure for at least 7 days before tiling",
      "Clean and prepare the bond beam surface",
      "Install coping stones around pool perimeter using mortar",
      "Ensure coping has slight slope away from pool for drainage",
      "Allow coping to set for 24 hours",
      "Mark waterline 6 inches below coping",
      "Apply thin-set mortar to pool wall at waterline",
      "Install tile in straight, level rows",
      "Use tile spacers for consistent grout lines",
      "Cut tiles as needed for corners and returns",
      "Allow thin-set to cure for 24-48 hours",
      "Apply waterproof grout between tiles",
      "Clean excess grout with sponge while still workable",
      "Seal grout after it fully cures (7 days)",
      "Clean tile thoroughly before filling pool",
    ],
    toolsNeeded: [
      "Tile saw (wet saw)",
      "Notched trowel",
      "Grout float",
      "Tile spacers",
      "Level",
      "Sponges and buckets",
      "Grout sealer applicator",
      "Measuring tape",
    ],
    materialsNeeded: [
      "Pool coping stones (travertine, concrete, or natural stone)",
      "Waterline tile (6x6 inch ceramic or glass)",
      "Thin-set mortar (waterproof)",
      "Grout (waterproof, mildew-resistant)",
      "Grout sealer",
      "Mortar for coping",
    ],
    safetyWarnings: [
      "Tile saws can cause serious cuts - use blade guard and push stick",
      "Wear safety glasses when cutting tile",
      "Thin-set and grout can irritate skin - wear gloves",
      "Work on stable scaffolding or ladder - falls are common",
      "Ensure proper ventilation when using sealers",
    ],
    proTips: [
      "Choose slip-resistant coping for safety",
      "Use glass tile for waterline - it resists calcium buildup better",
      "Start tiling from the center and work outward for symmetry",
      "Keep grout lines consistent - use quality spacers",
      "Apply grout sealer annually to prevent staining",
      "Consider bullnose coping for a rounded, comfortable edge",
    ],
    commonMistakes: [
      "Not allowing shotcrete to cure before tiling",
      "Using non-waterproof materials",
      "Inconsistent grout lines",
      "Not sealing grout, leading to staining and mildew",
      "Improper slope on coping, causing water to drain into pool",
      "Rushing the installation - tile work requires patience",
    ],
    estimatedCost: "$3,000 - $8,000",
    laborRequired: "Skilled tile setter recommended, 2 workers",
  },
  {
    id: "equipment",
    title: "Install Pool Equipment",
    duration: "2-3 days",
    difficulty: "Hard",
    icon: Wrench,
    description:
      "Install and connect all pool equipment including pump, filter, heater, and automation systems. Proper installation ensures efficient operation and longevity.",
    detailedSteps: [
      "Prepare equipment pad with level concrete slab (4x8 feet minimum)",
      "Position pump closest to pool for optimal suction",
      "Install filter next to pump",
      "Mount heater (if applicable) downstream from filter",
      "Install chlorinator or salt system",
      "Connect all equipment with PVC plumbing",
      "Install pressure gauge on filter",
      "Wire all electrical components (hire licensed electrician)",
      "Install GFCI breakers for all pool equipment",
      "Connect automation system if applicable",
      "Install time clock for automatic pump operation",
      "Prime pump and check for leaks",
      "Test all equipment operation",
      "Install equipment covers or enclosure for protection",
      "Label all valves and switches clearly",
    ],
    toolsNeeded: [
      "Wrenches and socket set",
      "Screwdrivers",
      "PVC cutter and cement",
      "Level",
      "Drill",
      "Wire strippers (for electrician)",
      "Multimeter",
    ],
    materialsNeeded: [
      "Pool pump (1.5-2 HP for residential)",
      "Sand or cartridge filter",
      "Pool heater (gas, electric, or heat pump)",
      "Chlorinator or salt chlorine generator",
      "Pressure gauge",
      "Valves and unions",
      "Electrical wire and conduit",
      "GFCI breakers",
      "Timer or automation system",
    ],
    safetyWarnings: [
      "HIRE LICENSED ELECTRICIAN - pool electrical work is dangerous and must meet code",
      "All equipment must be bonded and grounded to prevent electrocution",
      "Install GFCI protection on all circuits",
      "Never work on electrical components while wet",
      "Ensure proper clearances around equipment for ventilation and service",
      "Gas heaters require proper venting - carbon monoxide can be fatal",
    ],
    proTips: [
      "Oversize your pump and filter slightly for better performance",
      "Install unions at all equipment for easy future replacement",
      "Use variable-speed pump for energy savings (can save $500+ per year)",
      "Install automation system - convenience is worth the investment",
      "Keep equipment manual and warranty information in waterproof container",
      "Consider solar heating to reduce operating costs",
      "Install check valves to prevent backflow",
    ],
    commonMistakes: [
      "Undersizing pump or filter for pool volume",
      "Improper electrical installation - hire a professional",
      "Not bonding all metal components",
      "Positioning equipment too far from pool, reducing efficiency",
      "Forgetting to install unions, making future service difficult",
      "Not protecting equipment from weather",
    ],
    estimatedCost: "$3,000 - $8,000 (equipment + installation)",
    laborRequired: "Licensed electrician required, plumber recommended, 2 workers",
  },
  {
    id: "finish",
    title: "Apply Interior Finish",
    duration: "1-2 days application + 14-28 days cure",
    difficulty: "Medium",
    icon: Paintbrush,
    description:
      "Apply the final interior surface finish - plaster, pebble, or tile. This creates the waterproof surface and aesthetic appearance of your pool.",
    detailedSteps: [
      "Choose finish type: plaster, pebble, quartz, or tile",
      "Acid wash shotcrete surface to prepare for plaster",
      "Rinse thoroughly and allow to dry",
      "For plaster finish:",
      "  - Mix plaster on-site (white or colored)",
      "  - Apply in single continuous session (no stopping)",
      "  - Trowel smooth working from deep end to shallow",
      "  - Maintain consistent 1/2 inch thickness",
      "  - Work quickly - plaster sets in 4-6 hours",
      "For pebble finish:",
      "  - Apply base coat of cement",
      "  - Embed pebbles into wet cement",
      "  - Wash surface to expose pebbles",
      "  - Trowel smooth",
      "For tile finish:",
      "  - Follow tile installation process for entire interior",
      "Start filling pool immediately after finish application",
      "Brush pool surface daily during first week",
      "Balance water chemistry carefully during cure period",
      "Avoid heavy use for first 28 days",
    ],
    toolsNeeded: [
      "Plaster trowels",
      "Mixing equipment",
      "Acid washing equipment",
      "Brushes (pool brush)",
      "Hoses for filling",
      "Water testing kit",
    ],
    materialsNeeded: [
      "Plaster mix (white or colored) - 80-100 bags",
      "OR Pebble finish material",
      "OR Tile and thin-set",
      "Acid for washing",
      "Start-up chemicals",
    ],
    safetyWarnings: [
      "Acid washing produces toxic fumes - wear respirator and work in ventilated area",
      "Wet plaster is caustic - wear protective clothing, gloves, and eye protection",
      "Never drain a newly plastered pool - can cause permanent damage",
      "Work quickly but carefully - plaster sets fast",
      "Keep children and pets away during application",
    ],
    proTips: [
      "Hire professional plasterers - this is skilled work requiring experience",
      "Schedule plastering for mild weather (60-80°F)",
      "Have crew of 4-6 workers ready - must complete in one session",
      "Start filling pool immediately after plastering to prevent drying and cracking",
      "Brush pool daily for first week to remove loose plaster dust",
      "Don't add salt (if using salt system) until plaster is fully cured (28 days)",
      "Consider colored or pebble finish for longer life and better appearance",
    ],
    commonMistakes: [
      "Attempting DIY plaster - requires professional expertise",
      "Not filling pool immediately after plastering",
      "Improper water chemistry during cure period, causing staining or etching",
      "Not brushing daily, leaving plaster dust that causes rough spots",
      "Draining pool during cure period",
      "Adding salt too early, damaging fresh plaster",
    ],
    estimatedCost: "$3,000 - $10,000 (plaster: $3-5k, pebble: $6-10k)",
    laborRequired: "Professional plaster crew required, 4-6 workers",
  },
  {
    id: "startup",
    title: "Fill, Balance & Start-Up",
    duration: "3-7 days",
    difficulty: "Easy",
    icon: Droplets,
    description:
      "Fill the pool, balance water chemistry, and start up all equipment. Proper start-up is critical for protecting your new finish and ensuring safe swimming.",
    detailedSteps: [
      "Begin filling pool immediately after plaster application",
      "Fill continuously until water reaches middle of tile or skimmer",
      "Monitor fill to prevent overflow",
      "Once filled, turn on circulation system",
      "Prime pump if needed (fill pump basket with water)",
      "Check for leaks in all plumbing and equipment",
      "Backwash filter to remove construction debris",
      "Test water chemistry (pH, alkalinity, calcium hardness, chlorine)",
      "Adjust pH to 7.4-7.6",
      "Adjust alkalinity to 80-120 ppm",
      "Adjust calcium hardness to 200-400 ppm",
      "Add chlorine to reach 1-3 ppm",
      "Brush pool walls and floor daily for first week",
      "Run pump 24/7 for first week",
      "Test and adjust chemistry daily for first week",
      "Vacuum pool to remove plaster dust",
      "After 28 days, perform acid wash if needed",
    ],
    toolsNeeded: [
      "Water testing kit or test strips",
      "Pool brush",
      "Pool vacuum",
      "Telescoping pole",
      "Leaf skimmer",
      "Thermometer",
    ],
    materialsNeeded: [
      "Start-up chemical kit",
      "pH increaser/decreaser",
      "Alkalinity increaser",
      "Calcium hardness increaser",
      "Chlorine (tablets, liquid, or granular)",
      "Stabilizer (cyanuric acid)",
      "Algaecide",
    ],
    safetyWarnings: [
      "Never mix pool chemicals together - can cause dangerous reactions",
      "Add chemicals to water, never water to chemicals",
      "Store chemicals in cool, dry place away from children",
      "Wear gloves and eye protection when handling chemicals",
      "Never swim immediately after adding chemicals - wait recommended time",
      "High chlorine levels can cause skin and eye irritation",
    ],
    proTips: [
      "Use a professional pool service for first month to ensure proper start-up",
      "Keep detailed records of water chemistry readings",
      "Invest in quality test kit - accurate testing is essential",
      "Run pump during off-peak hours to save on electricity",
      "Install pool cover to reduce evaporation and chemical use",
      "Consider salt chlorine generator for easier maintenance",
      "Brush pool daily even after start-up period for best finish longevity",
    ],
    commonMistakes: [
      "Not brushing daily, allowing plaster dust to harden on surface",
      "Improper water chemistry causing staining or etching",
      "Adding too many chemicals at once",
      "Not running pump enough during start-up period",
      "Swimming too soon before chemicals are balanced",
      "Neglecting to vacuum plaster dust",
      "Adding salt before plaster is cured (if using salt system)",
    ],
    estimatedCost: "$200 - $500 (chemicals and testing supplies)",
    laborRequired: "Homeowner can handle with guidance, or hire pool service",
  },
  {
    id: "decking",
    title: "Install Decking & Landscaping",
    duration: "1-2 weeks",
    difficulty: "Medium",
    icon: Hammer,
    description:
      "Complete the pool area with decking, patio, and landscaping. This creates a functional and attractive outdoor living space around your pool.",
    detailedSteps: [
      "Plan deck layout and drainage",
      "Excavate area around pool for decking (4-6 inches deep)",
      "Install gravel base and compact thoroughly",
      "Add sand leveling layer (1-2 inches)",
      "For concrete deck:",
      "  - Build forms around pool perimeter",
      "  - Install rebar or wire mesh reinforcement",
      "  - Pour concrete with proper slope for drainage (1/4 inch per foot)",
      "  - Finish surface (broom, stamped, or exposed aggregate)",
      "  - Cut control joints every 8-10 feet",
      "  - Cure for 7 days",
      "For pavers:",
      "  - Lay pavers in desired pattern",
      "  - Use edge restraints to prevent shifting",
      "  - Fill joints with polymeric sand",
      "  - Compact and seal",
      "Install pool fence (required by code in most areas)",
      "Add landscaping (plants, trees, lighting)",
      "Install outdoor furniture and accessories",
      "Ensure proper drainage away from pool",
    ],
    toolsNeeded: [
      "Concrete mixer or ready-mix truck",
      "Trowels and floats",
      "Level and screed board",
      "Saw for cutting control joints",
      "Plate compactor",
      "Wheelbarrow",
      "Shovels and rakes",
    ],
    materialsNeeded: [
      "Concrete (for concrete deck) or pavers",
      "Gravel base (5-10 tons)",
      "Sand (2-4 tons)",
      "Rebar or wire mesh",
      "Edge restraints (for pavers)",
      "Polymeric sand",
      "Pool fence materials",
      "Landscaping plants and materials",
    ],
    safetyWarnings: [
      "Install pool fence immediately - required by law and prevents drowning",
      "Fence must be at least 4 feet high with self-closing, self-latching gate",
      "Use slip-resistant deck surface to prevent falls",
      "Ensure proper drainage to prevent standing water",
      "Keep deck clear of trip hazards",
      "Install adequate lighting for nighttime safety",
    ],
    proTips: [
      "Slope deck away from pool at 1/4 inch per foot for drainage",
      "Use light-colored decking to reduce heat absorption",
      "Consider stamped or textured concrete for better traction and appearance",
      "Install deck drains in low spots to prevent water accumulation",
      "Use salt-tolerant plants if using salt chlorine generator",
      "Add shade structures (pergola, umbrella) for comfort",
      "Install outdoor electrical outlets (GFCI protected) for convenience",
    ],
    commonMistakes: [
      "Not installing required pool fence - can result in fines and liability",
      "Improper drainage causing water to pool on deck",
      "Using slippery materials that become hazardous when wet",
      "Not allowing concrete to cure before use",
      "Planting trees too close to pool (roots can damage pool and plumbing)",
      "Insufficient base preparation causing settling and cracking",
    ],
    estimatedCost: "$5,000 - $20,000 (depending on size and materials)",
    laborRequired: "2-4 workers, concrete work may require professionals",
  },
]

export default function ConstructionGuide() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null)

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Hard":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "Expert":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">Complete Construction Guide</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Follow this comprehensive step-by-step guide to build your swimming pool. Each phase includes detailed
          instructions, safety warnings, pro tips, and common mistakes to avoid.
        </p>
      </div>

      <div className="space-y-4">
        {constructionSteps.map((step, index) => {
          const Icon = step.icon
          const isExpanded = expandedStep === step.id

          return (
            <Card key={step.id} className="border-border overflow-hidden">
              <button
                onClick={() => toggleStep(step.id)}
                className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                          <Badge variant="outline" className={getDifficultyColor(step.difficulty)}>
                            {step.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">{step.title}</h3>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-muted-foreground mb-3">{step.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{step.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{step.laborRequired}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-semibold">{step.estimatedCost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border p-6 space-y-6 bg-muted/20">
                  {/* Detailed Steps */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Detailed Steps
                    </h4>
                    <ol className="space-y-2 ml-7">
                      {step.detailedSteps.map((detailStep, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          <span className="font-medium text-primary">{idx + 1}.</span> {detailStep}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tools Needed */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-primary" />
                      Tools Needed
                    </h4>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {step.toolsNeeded.map((tool, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Materials Needed */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Hammer className="w-5 h-5 text-primary" />
                      Materials Needed
                    </h4>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {step.materialsNeeded.map((material, idx) => (
                        <Badge key={idx} variant="outline">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Safety Warnings */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-red-500 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Safety Warnings
                    </h4>
                    <ul className="space-y-2 ml-7">
                      {step.safetyWarnings.map((warning, idx) => (
                        <li key={idx} className="text-red-400 text-sm">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pro Tips */}
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2 ml-7">
                      {step.proTips.map((tip, idx) => (
                        <li key={idx} className="text-muted-foreground text-sm">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Mistakes */}
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-500 mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Common Mistakes to Avoid
                    </h4>
                    <ul className="space-y-2 ml-7">
                      {step.commonMistakes.map((mistake, idx) => (
                        <li key={idx} className="text-orange-400 text-sm">
                          • {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Final Notes */}
      <Card className="border-primary/20 bg-primary/5 p-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          Important Final Notes
        </h3>
        <ul className="space-y-2 text-muted-foreground ml-7">
          <li>• Always check local building codes and regulations before starting construction</li>
          <li>• Hire licensed professionals for electrical, plumbing, and structural work</li>
          <li>• Obtain all required permits and schedule inspections</li>
          <li>• Budget an additional 10-20% for unexpected costs and changes</li>
          <li>• Consider hiring a pool consultant to review your plans before starting</li>
          <li>• Document everything with photos and keep all receipts for warranty purposes</li>
          <li>• Never compromise on safety features - they can save lives</li>
          <li>• Join online pool building communities for support and advice from experienced DIY pool builders</li>
        </ul>
      </Card>
    </div>
  )
}
