"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { useDogs } from "@/hooks/use-dogs"
import { useAuth } from "@/hooks/use-auth"
import { useParams, useRouter } from "next/navigation"

export default function EditarCachorroPage() {
  const params = useParams()
  const { getDog, editDog, loading: dogsLoading } = useDogs()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const dogId = params.id as string

  const [formData, setFormData] = useState({
    nome: "",
    raca: "",
    fase: "Filhote",
    sexo: "Macho",
    idade: "",
    cor: "",
    endereco: "",
    descricao: "",
    image: "",
    treinadoCasa: false,
    petAmigavel: false,
  })
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    if (authLoading || dogsLoading) return
    const dog = getDog(dogId)
    if (!dog) {
      alert("Cachorro não encontrado")
      router.push("/busca")
      return
    }

    if (!user || dog.doadorId !== user.id) {
      alert("Você não tem permissão para editar este cachorro")
      router.push("/busca")
      return
    }

    setFormData({
      nome: dog.nome,
      raca: dog.raca,
      fase: dog.fase,
      sexo: dog.sexo,
      idade: dog.idade,
      cor: dog.cor,
      endereco: dog.endereco,
      descricao: dog.descricao,
      image: dog.image,
      treinadoCasa: dog.treinadoCasa,
      petAmigavel: dog.petAmigavel,
    })
    setPageLoading(false)
  }, [dogId, getDog, user, router, authLoading, dogsLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.raca || !formData.idade) {
      alert("Preencha todos os campos obrigatórios")
      return
    }

    editDog(dogId, formData)
    router.push(`/detalhes/${dogId}`)
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
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
          <h1 className="text-2xl font-bold text-gray-800">Editar Cachorro</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-gray-700 text-sm">
                Nome *
              </Label>
              <Input
                id="nome"
                placeholder="Nome do cachorro"
                className="h-11 rounded-xl border-gray-300"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="raca" className="text-gray-700 text-sm">
                Raça *
              </Label>
              <Input
                id="raca"
                placeholder="Ex: Golden Retriever"
                className="h-11 rounded-xl border-gray-300"
                value={formData.raca}
                onChange={(e) => handleChange("raca", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fase" className="text-gray-700 text-sm">
                  Fase
                </Label>
                <select
                  id="fase"
                  className="h-11 w-full rounded-xl border border-gray-300 px-3 text-sm"
                  value={formData.fase}
                  onChange={(e) => handleChange("fase", e.target.value)}
                >
                  <option>Filhote</option>
                  <option>Adulto</option>
                  <option>Idoso</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sexo" className="text-gray-700 text-sm">
                  Sexo
                </Label>
                <select
                  id="sexo"
                  className="h-11 w-full rounded-xl border border-gray-300 px-3 text-sm"
                  value={formData.sexo}
                  onChange={(e) => handleChange("sexo", e.target.value)}
                >
                  <option>Macho</option>
                  <option>Fêmea</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idade" className="text-gray-700 text-sm">
                  Idade *
                </Label>
                <Input
                  id="idade"
                  placeholder="Ex: 5 meses"
                  className="h-11 rounded-xl border-gray-300"
                  value={formData.idade}
                  onChange={(e) => handleChange("idade", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cor" className="text-gray-700 text-sm">
                  Cor
                </Label>
                <Input
                  id="cor"
                  placeholder="Ex: Malhado"
                  className="h-11 rounded-xl border-gray-300"
                  value={formData.cor}
                  onChange={(e) => handleChange("cor", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco" className="text-gray-700 text-sm">
                Endereço
              </Label>
              <Input
                id="endereco"
                placeholder="Localização do animal"
                className="h-11 rounded-xl border-gray-300"
                value={formData.endereco}
                onChange={(e) => handleChange("endereco", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao" className="text-gray-700 text-sm">
                Descrição
              </Label>
              <Textarea
                id="descricao"
                placeholder="Conte mais sobre o cachorro..."
                className="min-h-24 rounded-xl border-gray-300 text-sm"
                value={formData.descricao}
                onChange={(e) => handleChange("descricao", e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 text-sm">Características</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="treinado"
                  checked={formData.treinadoCasa}
                  onCheckedChange={(checked) => handleChange("treinadoCasa", checked as boolean)}
                />
                <label htmlFor="treinado" className="text-sm text-gray-700 cursor-pointer">
                  Treinado em Casa
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="amigavel"
                  checked={formData.petAmigavel}
                  onCheckedChange={(checked) => handleChange("petAmigavel", checked as boolean)}
                />
                <label htmlFor="amigavel" className="text-sm text-gray-700 cursor-pointer">
                  Pet Amigável
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-base font-semibold mt-6"
            >
              Salvar Alterações
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
