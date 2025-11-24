"use client"

import Link from "next/link"
import { Search, Settings, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useDogs } from "@/hooks/use-dogs"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"

export default function BuscaPage() {
  const { dogs, search } = useDogs()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    search(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="bg-white rounded-b-3xl shadow-md p-6 pb-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Localização</p>
              <p className="text-base font-semibold text-gray-800">{user?.endereco || "Seu endereço"}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/cadastrar-cachorro">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Plus className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/configuracoes">
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 h-12 rounded-xl border-gray-300"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4 mt-4">
        {dogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum cachorro encontrado</p>
          </div>
        ) : (
          dogs.map((dog) => (
            <Link key={dog.id} href={`/detalhes/${dog.id}`}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex gap-4 p-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={dog.image || "/images/main-20banner.png"}
                      alt={dog.nome}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-gray-800">{dog.nome}</h3>
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                      <div>
                        <p className="font-semibold">Raça</p>
                        <p>{dog.raca}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Fase</p>
                        <p>{dog.fase}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Sexo</p>
                        <p>{dog.sexo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
