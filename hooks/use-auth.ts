"use client"

import { useState, useEffect } from "react"
import {
  type User,
  getCurrentUser,
  loginUser,
  logoutUser,
  createUser,
  updateUser,
  initializeStorage,
} from "@/lib/storage"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeStorage()
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = (email: string, senha: string): boolean => {
    const loggedUser = loginUser(email, senha)
    if (loggedUser) {
      setUser(loggedUser)
      return true
    }
    return false
  }

  const logout = () => {
    logoutUser()
    setUser(null)
  }

  const register = (userData: Omit<User, "id">): User => {
    const newUser = createUser(userData)
    setUser(newUser)
    return newUser
  }

  const updateProfile = (updates: Partial<User>): User | null => {
    if (!user) return null
    const updatedUser = updateUser(user.id, updates)
    if (updatedUser) {
      setUser(updatedUser)
    }
    return updatedUser
  }

  return { user, loading, login, logout, register, updateProfile }
}
