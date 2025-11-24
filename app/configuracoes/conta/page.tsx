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

export default function ContaPage() {
  const { user, updateProfile, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    cpf: "",
    nascimento: "",
  })

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push("/")
      return
    }

    setFormData({
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      endereco: user.endereco,
      cpf: user.cpf,
      nascimento: user.nascimento,
    })
  }, [user, router, loading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = updateProfile(formData)

    if (result) {
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso!",
      })
      router.push("/configuracoes")
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil.",
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
          <h1 className="text-2xl font-bold text-gray-800">Conta</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="Digite seu telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              type="text"
              placeholder="Digite seu endereço"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              placeholder="Digite o CPF"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nascimento">Data de nascimento</Label>
            <Input
              id="nascimento"
              type="date"
              value={formData.nascimento}
              onChange={(e) => setFormData({ ...formData, nascimento: e.target.value })}
              className="h-12 rounded-xl"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-orange-500 hover:bg-orange-600 rounded-xl text-base font-semibold"
          >
            Salvar alterações
          </Button>
        </form>
      </div>
    </div>
  )
}
