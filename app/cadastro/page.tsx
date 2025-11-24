"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, Calendar } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    endereco: "",
    telefone: "",
    cpf: "",
    nascimento: "",
  })
  const [error, setError] = useState("")
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.nome || !formData.email || !formData.senha) {
      setError("Preencha pelo menos nome, email e senha")
      return
    }

    try {
      register(formData)
      router.push("/busca")
    } catch (err) {
      setError("Erro ao criar conta")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-block">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-5">
          <h1 className="text-2xl font-bold text-gray-800">Cadastro</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="nome" className="text-gray-700 text-sm">
                Nome
              </Label>
              <Input
                id="nome"
                placeholder="Digite seu nome completo"
                className="h-11 rounded-xl border-gray-300"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-gray-700 text-sm">
                Senha
              </Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite uma senha"
                className="h-11 rounded-xl border-gray-300"
                value={formData.senha}
                onChange={(e) => handleChange("senha", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco" className="text-gray-700 text-sm">
                Endereço
              </Label>
              <Input
                id="endereco"
                placeholder="Digite seu endereço"
                className="h-11 rounded-xl border-gray-300"
                value={formData.endereco}
                onChange={(e) => handleChange("endereco", e.target.value)}
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
                placeholder="Digite o CPF"
                className="h-11 rounded-xl border-gray-300"
                value={formData.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nascimento" className="text-gray-700 text-sm">
                Data de nascimento
              </Label>
              <div className="relative">
                <Input
                  id="nascimento"
                  type="date"
                  placeholder="Escolha uma data"
                  className="h-11 rounded-xl border-gray-300 pr-12"
                  value={formData.nascimento}
                  onChange={(e) => handleChange("nascimento", e.target.value)}
                />
                <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-base font-semibold mt-6"
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
