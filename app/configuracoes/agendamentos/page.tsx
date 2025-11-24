"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Mail, Phone, FileText, Dog as DogIcon } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { getVisits, getDogById, getUserDogs, type Visit, type Dog } from "@/lib/storage"
import { useRouter } from "next/navigation"
import { initializeStorage } from "@/lib/storage"

interface VisitWithDog extends Visit {
  dog?: Dog
}

export default function AgendamentosPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [visits, setVisits] = useState<VisitWithDog[]>([])
  const [loadingVisits, setLoadingVisits] = useState(true)
  const [userDogIds, setUserDogIds] = useState<string[]>([])

  const loadVisits = useCallback(() => {
    if (!user) return

    initializeStorage()
    const allVisits = getVisits()
    const userDogs = getUserDogs(user.id)
    const dogIds = userDogs.map((dog) => dog.id)
    setUserDogIds(dogIds)

    // Filter visits: either visits made by the user or visits for their dogs
    const relevantVisits = allVisits.filter(
      (visit) => visit.userId === user.id || dogIds.includes(visit.dogId),
    )

    // Enrich visits with dog information
    const visitsWithDogs: VisitWithDog[] = relevantVisits.map((visit) => {
      const dog = getDogById(visit.dogId)
      return { ...visit, dog }
    })

    // Sort by date (most recent first)
    visitsWithDogs.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())

    setVisits(visitsWithDogs)
    setLoadingVisits(false)
  }, [user])

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push("/")
      return
    }
    loadVisits()
  }, [user, router, loadVisits, loading])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const isUpcoming = (dateString: string) => {
    const visitDate = new Date(dateString)
    visitDate.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return visitDate >= today
  }

  if (loading || loadingVisits) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <p className="text-gray-600">Carregando agendamentos...</p>
      </div>
    )
  }

  if (!user) return null

  const upcomingVisits = visits.filter((v) => isUpcoming(v.data))
  const pastVisits = visits.filter((v) => !isUpcoming(v.data))
  const isOwnerVisit = (visit: Visit) => {
    return userDogIds.includes(visit.dogId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/configuracoes" className="inline-block">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Agendamentos de Visitas</h1>
          <p className="text-sm text-gray-600 mt-1">Visualize suas visitas agendadas e recebidas</p>
        </div>

        {visits.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Nenhum agendamento encontrado</p>
            <p className="text-sm text-gray-500">Você ainda não tem visitas agendadas</p>
          </div>
        ) : (
          <div className="space-y-6">
            {upcomingVisits.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximas Visitas</h2>
                <div className="space-y-4">
                  {upcomingVisits.map((visit) => (
                    <div
                      key={visit.id}
                      className="bg-white rounded-3xl shadow-xl p-6 space-y-4 border-l-4 border-orange-500"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <DogIcon className="h-5 w-5 text-orange-500" />
                            <h3 className="font-bold text-lg text-gray-800">
                              {visit.dog?.nome || "Cachorro não encontrado"}
                            </h3>
                            {isOwnerVisit(visit) && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                Para seu cachorro
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span className="font-semibold">{formatDate(visit.data)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Nome</p>
                            <p className="text-sm font-medium text-gray-800">{visit.nome}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Email</p>
                            <p className="text-sm font-medium text-gray-800">{visit.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Telefone</p>
                            <p className="text-sm font-medium text-gray-800">{visit.telefone}</p>
                          </div>
                        </div>

                        {visit.cpf && (
                          <div className="flex items-start gap-3">
                            <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 mb-1">CPF</p>
                              <p className="text-sm font-medium text-gray-800">{visit.cpf}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {visit.observacoes && (
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500 mb-2">Observações</p>
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{visit.observacoes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pastVisits.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Visitas Anteriores</h2>
                <div className="space-y-4">
                  {pastVisits.map((visit) => (
                    <div
                      key={visit.id}
                      className="bg-white rounded-3xl shadow-xl p-6 space-y-4 border-l-4 border-gray-300 opacity-75"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <DogIcon className="h-5 w-5 text-gray-400" />
                            <h3 className="font-bold text-lg text-gray-800">
                              {visit.dog?.nome || "Cachorro não encontrado"}
                            </h3>
                            {isOwnerVisit(visit) && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                Para seu cachorro
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <Calendar className="h-4 w-4" />
                            <span className="font-semibold">{formatDate(visit.data)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-start gap-3">
                          <User className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Nome</p>
                            <p className="text-sm font-medium text-gray-800">{visit.nome}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Email</p>
                            <p className="text-sm font-medium text-gray-800">{visit.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Telefone</p>
                            <p className="text-sm font-medium text-gray-800">{visit.telefone}</p>
                          </div>
                        </div>

                        {visit.cpf && (
                          <div className="flex items-start gap-3">
                            <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500 mb-1">CPF</p>
                              <p className="text-sm font-medium text-gray-800">{visit.cpf}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {visit.observacoes && (
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500 mb-2">Observações</p>
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{visit.observacoes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

