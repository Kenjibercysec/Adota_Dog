"use client"

import Link from "next/link"
import { ArrowLeft, MapPin, MessageCircle, Trash2, Edit } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { useDogs } from "@/hooks/use-dogs"
import { useAuth } from "@/hooks/use-auth"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { Dog } from "@/lib/storage"
import { ChatDialog } from "@/components/chat-dialog"
import { cn } from "@/lib/utils"

export default function DetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const { dogs, loading: dogsLoading, removeDog } = useDogs()
  const { user } = useAuth()
  const [dog, setDog] = useState<Dog | null>(null)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    const id = params.id as string
    const foundDog = dogs.find((item) => item.id === id) || null
    setDog(foundDog)
  }, [params.id, dogs])

  const handleDelete = () => {
    if (!dog) return
    if (confirm(`Tem certeza que deseja excluir ${dog.nome}?`)) {
      removeDog(dog.id)
      router.push("/busca")
    }
  }

  if (dogsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <p className="text-gray-600">Carregando cachorro...</p>
      </div>
    )
  }

  if (!dog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <p className="text-gray-600">Cachorro não encontrado</p>
      </div>
    )
  }

  const isOwner = user?.id === dog.doadorId

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="relative h-80 bg-white">
        <Link href="/busca" className="absolute top-6 left-6 z-10 bg-white/80 rounded-full p-2">
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Link>

        {isOwner && (
          <div className="absolute top-6 right-6 z-10 flex gap-2">
            <Link href={`/editar-cachorro/${dog.id}`}>
              <Button size="icon" className="bg-white/80 hover:bg-white rounded-full">
                <Edit className="h-5 w-5 text-gray-700" />
              </Button>
            </Link>
            <Button size="icon" onClick={handleDelete} className="bg-white/80 hover:bg-white rounded-full">
              <Trash2 className="h-5 w-5 text-red-600" />
            </Button>
          </div>
        )}

        <Image src={dog.image || "/images/adoption-20banner.png"} alt={dog.nome} fill className="object-cover" />
      </div>

      <div className="max-w-4xl mx-auto -mt-6 relative">
        <div className="bg-white rounded-t-3xl shadow-xl p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{dog.nome}</h1>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{dog.endereco}</span>
              </div>
            </div>

            <button onClick={() => setShowChat(true)} className="bg-orange-100 p-3 rounded-full hover:bg-orange-200">
              <MessageCircle className="h-6 w-6 text-orange-600" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Sexo</p>
              <p className="text-base font-bold text-gray-800">{dog.sexo}</p>
            </div>
            <div className="text-center bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Idade</p>
              <p className="text-base font-bold text-gray-800">{dog.idade}</p>
            </div>
            <div className="text-center bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Cor</p>
              <p className="text-base font-bold text-gray-800">{dog.cor}</p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            {dog.treinadoCasa && (
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                <Image
                  src="/images/frame-207.png"
                  alt="Treinado em Casa"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm text-green-700 font-medium">Treinado em Casa</span>
              </div>
            )}
            {dog.petAmigavel && (
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <Image
                  src="/images/frame-208.png"
                  alt="Pet Amigável"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm text-blue-700 font-medium">Pet Amigável</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-gray-800">Detalhes</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{dog.descricao}</p>
          </div>

          <a
            href={`/agendar?dogId=${dog.id}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-lg font-semibold justify-center text-center",
            )}
          >
            Adote agora
          </a>
        </div>
      </div>

      <ChatDialog open={showChat} onOpenChange={setShowChat} dogId={dog.id} dogName={dog.nome} />
    </div>
  )
}
