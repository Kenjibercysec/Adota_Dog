"use client"

import { useState, useEffect } from "react"
import {
  type Dog,
  getDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
  searchDogs,
  initializeStorage,
} from "@/lib/storage"

export function useDogs() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)

  const loadDogs = () => {
    initializeStorage()
    const allDogs = getDogs()
    setDogs(allDogs)
    setLoading(false)
  }

  useEffect(() => {
    loadDogs()
  }, [])

  const search = (query: string) => {
    if (!query.trim()) {
      setDogs(getDogs())
    } else {
      setDogs(searchDogs(query))
    }
  }

  const addDog = (dog: Omit<Dog, "id">): Dog => {
    const newDog = createDog(dog)
    loadDogs()
    return newDog
  }

  const editDog = (id: string, updates: Partial<Dog>): Dog | null => {
    const updated = updateDog(id, updates)
    if (updated) loadDogs()
    return updated
  }

  const removeDog = (id: string): boolean => {
    const success = deleteDog(id)
    if (success) loadDogs()
    return success
  }

  const getDog = (id: string): Dog | undefined => {
    return getDogById(id)
  }

  return { dogs, loading, search, addDog, editDog, removeDog, getDog, reload: loadDogs }
}
