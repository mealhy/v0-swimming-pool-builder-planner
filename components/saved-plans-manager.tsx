"use client"

import { useState, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Save, FolderOpen, Trash2, Calendar } from "lucide-react"
import { getSavedPlans, savePlan, deletePlan, type SavedPlan } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

interface SavedPlansManagerProps {
  currentData: any
  onLoadPlan: (data: any) => void
}

export default function SavedPlansManager({ currentData, onLoadPlan }: SavedPlansManagerProps) {
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([])
  const [planName, setPlanName] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setSavedPlans(getSavedPlans())
  }, [])

  const handleSave = () => {
    if (!planName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your plan",
        variant: "destructive",
      })
      return
    }

    const newPlan = savePlan(planName, currentData)
    setSavedPlans(getSavedPlans())
    setPlanName("")
    setIsOpen(false)
    toast({
      title: "Plan Saved",
      description: `"${planName}" has been saved successfully`,
    })
  }

  const handleDelete = (id: string, name: string) => {
    deletePlan(id)
    setSavedPlans(getSavedPlans())
    toast({
      title: "Plan Deleted",
      description: `"${name}" has been removed`,
    })
  }

  const handleLoad = (plan: SavedPlan) => {
    onLoadPlan(plan.data)
    toast({
      title: "Plan Loaded",
      description: `"${plan.name}" has been loaded`,
    })
  }

  return (
    <div className="flex gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Save className="w-4 h-4" />
            Save Plan
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">Save Your Pool Plan</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Give your plan a name to save it for later
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="e.g., Backyard Olympic Pool"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="bg-background border-border text-foreground"
            />
            <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground">
              Save Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <FolderOpen className="w-4 h-4" />
            Load Plan ({savedPlans.length})
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">Saved Plans</DialogTitle>
            <DialogDescription className="text-muted-foreground">Load a previously saved pool plan</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {savedPlans.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No saved plans yet</p>
            ) : (
              savedPlans.map((plan) => (
                <Card key={plan.id} className="border-border bg-background">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground">{plan.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(plan.updatedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleLoad(plan)} className="text-primary">
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(plan.id, plan.name)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
