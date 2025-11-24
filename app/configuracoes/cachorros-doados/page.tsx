"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { getUserDogs, deleteDog, type Dog } from "@/lib/storage"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function CachorrosDoadosPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [dogs, setDogs] = useState<Dog[]>([])

  const loadDogs = useCallback(() => {
    if (!user) return
    const userDogs = getUserDogs(user.id)
    setDogs(userDogs)
  }, [user])

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push("/")
      return
    }
    loadDogs()
  }, [user, router, loadDogs, loading])

  const handleDelete = (dogId: string) => {
    if (confirm("Tem certeza que deseja excluir este cachorro?")) {
      const success = deleteDog(dogId)
      if (success) {
        toast({
          title: "Cachorro removido",
          description: "O perfil foi excluído com sucesso!",
        })
        loadDogs()
      }
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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/configuracoes">
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Cachorros Doados</h1>
          </div>
          <Link href="/cadastrar-cachorro">
            <Button size="icon" className="h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {dogs.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <p className="text-gray-600 mb-4">Você ainda não cadastrou nenhum cachorro para doação</p>
              <Link href="/cadastrar-cachorro">
                <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl">Cadastrar primeiro cachorro</Button>
              </Link>
            </div>
          ) : (
            dogs.map((dog) => (
              <div key={dog.id} className="bg-white rounded-3xl shadow-xl p-4 flex gap-4">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image src={dog.image || "/placeholder.svg"} alt={dog.nome} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-800">{dog.nome}</h3>
                  <p className="text-sm text-gray-600">
                    {dog.raca} • {dog.fase} • {dog.sexo}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{dog.endereco}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`/editar-cachorro/${dog.id}`}>
                    <Button size="icon" variant="outline" className="h-9 w-9 rounded-lg bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-9 w-9 rounded-lg"
                    onClick={() => handleDelete(dog.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
