export const STORAGE_KEY = "pool-planner-data"
export const SAVED_PLANS_KEY = "pool-planner-saved-plans"

export interface SavedPlan {
  id: string
  name: string
  data: any
  createdAt: string
  updatedAt: string
}

export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Failed to save to localStorage:", error)
    return false
  }
}

export const loadFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Failed to load from localStorage:", error)
    return null
  }
}

export const savePlan = (name: string, data: any): SavedPlan => {
  const plans = loadFromLocalStorage(SAVED_PLANS_KEY) || []
  const newPlan: SavedPlan = {
    id: Date.now().toString(),
    name,
    data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  plans.push(newPlan)
  saveToLocalStorage(SAVED_PLANS_KEY, plans)
  return newPlan
}

export const getSavedPlans = (): SavedPlan[] => {
  return loadFromLocalStorage(SAVED_PLANS_KEY) || []
}

export const deletePlan = (id: string) => {
  const plans = getSavedPlans()
  const filtered = plans.filter((p) => p.id !== id)
  saveToLocalStorage(SAVED_PLANS_KEY, filtered)
}

export const updatePlan = (id: string, data: any) => {
  const plans = getSavedPlans()
  const updated = plans.map((p) => (p.id === id ? { ...p, data, updatedAt: new Date().toISOString() } : p))
  saveToLocalStorage(SAVED_PLANS_KEY, updated)
}
