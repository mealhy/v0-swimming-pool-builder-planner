"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { PoolPlanData } from "@/lib/types"
import { Ruler, Shapes } from "lucide-react"

interface SizeStepProps {
  data: PoolPlanData
  updateData: (data: Partial<PoolPlanData>) => void
}

export default function SizeStep({ data, updateData }: SizeStepProps) {
  return (
    <div className="space-y-8">
      {/* Shape */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shapes className="w-5 h-5 text-primary" />
          <Label className="text-lg font-semibold text-foreground">Pool Shape</Label>
        </div>
        <RadioGroup value={data.shape} onValueChange={(value) => updateData({ shape: value })}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Rectangular", "Oval", "Kidney", "Freeform", "L-Shaped", "Circular"].map((shape) => (
              <Card
                key={shape}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${
                  data.shape === shape ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => updateData({ shape })}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={shape} id={shape} />
                  <Label htmlFor={shape} className="cursor-pointer text-foreground font-medium">
                    {shape}
                  </Label>
                </div>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Size Presets */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5 text-primary" />
          <Label className="text-lg font-semibold text-foreground">Pool Size</Label>
        </div>
        <RadioGroup value={data.size} onValueChange={(value) => updateData({ size: value })}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Small", dimensions: "10' x 20'", desc: "Perfect for small yards" },
              { name: "Medium", dimensions: "15' x 30'", desc: "Family-sized pool" },
              { name: "Large", dimensions: "20' x 40'", desc: "Spacious swimming" },
            ].map((size) => (
              <Card
                key={size.name}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${
                  data.size === size.name ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => updateData({ size: size.name })}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={size.name} id={size.name} />
                    <Label htmlFor={size.name} className="cursor-pointer text-foreground font-medium">
                      {size.name}
                    </Label>
                  </div>
                  <div className="ml-7">
                    <p className="text-sm text-primary font-mono">{size.dimensions}</p>
                    <p className="text-xs text-muted-foreground">{size.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Custom Dimensions - now inside RadioGroup */}
          <Card className="p-4 border-border mt-4">
            <div className="flex items-center space-x-3 mb-4">
              <RadioGroupItem value="Custom" id="Custom" />
              <Label htmlFor="Custom" className="cursor-pointer text-foreground font-medium">
                Custom Dimensions
              </Label>
            </div>
            {data.size === "Custom" && (
              <div className="ml-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length" className="text-sm text-muted-foreground">
                    Length (ft)
                  </Label>
                  <Input
                    id="length"
                    type="number"
                    value={data.customLength || ""}
                    onChange={(e) => updateData({ customLength: Number(e.target.value) })}
                    placeholder="0"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-sm text-muted-foreground">
                    Width (ft)
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    value={data.customWidth || ""}
                    onChange={(e) => updateData({ customWidth: Number(e.target.value) })}
                    placeholder="0"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depth" className="text-sm text-muted-foreground">
                    Depth (ft)
                  </Label>
                  <Input
                    id="depth"
                    type="number"
                    value={data.customDepth || ""}
                    onChange={(e) => updateData({ customDepth: Number(e.target.value) })}
                    placeholder="0"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </Card>
        </RadioGroup>
      </div>
    </div>
  )
}
