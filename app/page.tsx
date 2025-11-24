"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !senha) {
      setError("Preencha todos os campos")
      return
    }

    const success = login(email, senha)
    if (success) {
      router.push("/busca")
    } else {
      setError("Email ou senha incorretos")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          {/* Header Image */}
          <div className="flex justify-center mb-4">
            <Image src="/images/cuate.png" alt="Dog illustration" width={200} height={200} className="object-contain" />
          </div>

          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Image
                src="/images/bem-vindo-20ao-20adota-20dog-21.png"
                alt="Bem-Vindo ao Adota Dog!"
                width={250}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/seu-20novo-20melhor-20amigo-20est-c3-a1-20a-20um-20clique-20de-20dist-c3-a2ncia-21.png"
                alt="Seu novo melhor amigo está a um clique de distância!"
                width={220}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-4">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                className="h-12 rounded-xl border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="h-12 rounded-xl border-gray-300"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-base font-semibold"
            >
              Login
            </Button>

            <div className="text-center pt-2">
              <Link href="/cadastro" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
