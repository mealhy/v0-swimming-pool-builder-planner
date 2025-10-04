"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PoolPlanData } from "@/lib/types"

interface PoolVisualizerProps {
  data: PoolPlanData
}

export default function PoolVisualizer({ data }: PoolVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    const padding = 60
    const maxPoolWidth = width - padding * 2
    const maxPoolHeight = height - padding * 2

    let poolLength = data.customLength || 30
    let poolWidth = data.customWidth || 15

    if (data.size === "Small (15x30 ft)") {
      poolLength = 30
      poolWidth = 15
    } else if (data.size === "Medium (20x40 ft)") {
      poolLength = 40
      poolWidth = 20
    } else if (data.size === "Large (25x50 ft)") {
      poolLength = 50
      poolWidth = 25
    }

    const scale = Math.min(maxPoolWidth / poolLength, maxPoolHeight / poolWidth)
    const scaledLength = poolLength * scale
    const scaledWidth = poolWidth * scale

    const x = (width - scaledLength) / 2
    const y = (height - scaledWidth) / 2

    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = "#333"
    ctx.lineWidth = 1
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    const gradient = ctx.createLinearGradient(x, y, x, y + scaledWidth)
    gradient.addColorStop(0, "#06b6d4")
    gradient.addColorStop(0.5, "#0891b2")
    gradient.addColorStop(1, "#0e7490")

    ctx.fillStyle = gradient
    ctx.strokeStyle = "#22d3ee"
    ctx.lineWidth = 3

    if (data.shape === "Rectangular") {
      ctx.fillRect(x, y, scaledLength, scaledWidth)
      ctx.strokeRect(x, y, scaledLength, scaledWidth)
    } else if (data.shape === "Oval") {
      ctx.beginPath()
      ctx.ellipse(x + scaledLength / 2, y + scaledWidth / 2, scaledLength / 2, scaledWidth / 2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    } else if (data.shape === "Kidney") {
      ctx.beginPath()
      ctx.ellipse(x + scaledLength * 0.3, y + scaledWidth / 2, scaledLength * 0.35, scaledWidth / 2, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(
        x + scaledLength * 0.7,
        y + scaledWidth / 2,
        scaledLength * 0.35,
        scaledWidth * 0.4,
        0,
        0,
        Math.PI * 2,
      )
      ctx.fill()
      ctx.strokeStyle = "#22d3ee"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.ellipse(x + scaledLength * 0.3, y + scaledWidth / 2, scaledLength * 0.35, scaledWidth / 2, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(
        x + scaledLength * 0.7,
        y + scaledWidth / 2,
        scaledLength * 0.35,
        scaledWidth * 0.4,
        0,
        0,
        Math.PI * 2,
      )
      ctx.stroke()
    } else if (data.shape === "L-Shape") {
      ctx.fillRect(x, y, scaledLength * 0.6, scaledWidth)
      ctx.fillRect(x, y, scaledLength, scaledWidth * 0.6)
      ctx.strokeRect(x, y, scaledLength * 0.6, scaledWidth)
      ctx.strokeRect(x, y, scaledLength, scaledWidth * 0.6)
    } else {
      ctx.fillRect(x, y, scaledLength, scaledWidth)
      ctx.strokeRect(x, y, scaledLength, scaledWidth)
    }

    if (data.extras.includes("Pool Ladder")) {
      ctx.fillStyle = "#94a3b8"
      ctx.fillRect(x + scaledLength - 15, y + scaledWidth / 2 - 20, 10, 40)
      ctx.strokeStyle = "#cbd5e1"
      ctx.lineWidth = 2
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.moveTo(x + scaledLength - 15, y + scaledWidth / 2 - 15 + i * 10)
        ctx.lineTo(x + scaledLength - 5, y + scaledWidth / 2 - 15 + i * 10)
        ctx.stroke()
      }
    }

    if (data.extras.includes("LED Lighting")) {
      const lightPositions = [
        { x: x + 20, y: y + 20 },
        { x: x + scaledLength - 20, y: y + 20 },
        { x: x + 20, y: y + scaledWidth - 20 },
        { x: x + scaledLength - 20, y: y + scaledWidth - 20 },
      ]
      lightPositions.forEach((pos) => {
        const lightGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 15)
        lightGradient.addColorStop(0, "#fbbf24")
        lightGradient.addColorStop(0.5, "rgba(251, 191, 36, 0.3)")
        lightGradient.addColorStop(1, "rgba(251, 191, 36, 0)")
        ctx.fillStyle = lightGradient
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    ctx.fillStyle = "#e2e8f0"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(`${poolLength}' x ${poolWidth}'`, x + scaledLength / 2, y - 15)
    ctx.fillText(data.shape || "Pool Shape", x + scaledLength / 2, y + scaledWidth + 30)

    if (data.poolType) {
      ctx.fillStyle = "#94a3b8"
      ctx.font = "12px sans-serif"
      ctx.fillText(data.poolType, x + scaledLength / 2, y + scaledWidth + 45)
    }
  }, [data])

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-xl text-card-foreground">Pool Preview</CardTitle>
        <CardDescription className="text-muted-foreground">Top-down view of your pool design</CardDescription>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} width={600} height={400} className="w-full border border-border rounded-lg" />
      </CardContent>
    </Card>
  )
}
