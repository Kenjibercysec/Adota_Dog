"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Check, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { createVisit } from "@/lib/storage"
import { useAuth } from "@/hooks/use-auth"

export default function AgendarPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const dogId = searchParams.get("dogId") || "1"

  const [formData, setFormData] = useState({
    nome: user?.nome || "",
    email: user?.email || "",
    telefone: user?.telefone || "",
    cpf: user?.cpf || "",
    data: "",
    observacoes: "",
  })
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone || "",
        cpf: user.cpf || "",
      }))
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert("Você precisa estar logado para agendar uma visita")
      return
    }

    if (!formData.nome || !formData.email || !formData.data) {
      alert("Preencha todos os campos obrigatórios")
      return
    }

    createVisit({
      dogId,
      userId: user.id,
      ...formData,
    })

    setSuccess(true)
    setTimeout(() => {
      router.push(`/detalhes/${dogId}`)
    }, 2000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Visita Agendada!</h2>
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link href={`/detalhes/${dogId}`} className="inline-block">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-5">
          <h1 className="text-2xl font-bold text-gray-800">Agendar visita</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-gray-700 text-sm">
                Nome
              </Label>
              <Input
                id="nome"
                placeholder="Insira seu nome completo"
                className="h-11 rounded-xl border-gray-300"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                className="h-11 rounded-xl border-gray-300"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-gray-700 text-sm">
                Telefone
              </Label>
              <div className="relative">
                <Input
                  id="telefone"
                  placeholder="Digite seu telefone"
                  className="h-11 rounded-xl border-gray-300 pr-12"
                  value={formData.telefone}
                  onChange={(e) => handleChange("telefone", e.target.value)}
                />
                {formData.telefone && <Check className="absolute right-3 top-3 h-5 w-5 text-green-500" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-gray-700 text-sm">
                CPF
              </Label>
              <Input
                id="cpf"
                placeholder="Digite seu CPF"
                className="h-11 rounded-xl border-gray-300"
                value={formData.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data" className="text-gray-700 text-sm">
                Data
              </Label>
              <div className="relative">
                <Input
                  id="data"
                  type="date"
                  placeholder="Escolha uma data"
                  className="h-11 rounded-xl border-gray-300 pr-12"
                  value={formData.data}
                  onChange={(e) => handleChange("data", e.target.value)}
                  required
                />
                <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes" className="text-gray-700 text-sm">
                Observações
              </Label>
              <Textarea
                id="observacoes"
                placeholder="Adicione informações adicionais sobre sua visita..."
                className="min-h-24 rounded-xl border-gray-300 text-sm"
                value={formData.observacoes}
                onChange={(e) => handleChange("observacoes", e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-base font-semibold mt-4"
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
