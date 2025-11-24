"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function LocalizacaoPage() {
  const { user, updateProfile, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [endereco, setEndereco] = useState("")

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push("/")
      return
    }
    setEndereco(user.endereco)
  }, [user, router, loading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = updateProfile({ endereco })

    if (result) {
      toast({
        title: "Localização atualizada",
        description: "Sua região de busca foi atualizada!",
      })
      router.push("/configuracoes")
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a localização.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/configuracoes">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Localização</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 space-y-6">
          <p className="text-gray-600 text-sm">Altere sua região de busca para encontrar cachorros próximos a você</p>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              type="text"
              placeholder="Digite seu endereço completo"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="h-12 rounded-xl"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 rounded-xl text-base font-semibold"
          >
            Salvar localização
          </Button>
        </form>
      </div>
    </div>
  )
}
