"use client"

import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function ConfiguracoesPage() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link href="/busca" className="inline-block">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>

          <div className="space-y-3">
            <Link href="/configuracoes/conta">
              <div className="flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800">Conta</h3>
                  <p className="text-sm text-gray-600">Alterar dados da conta e privacidade</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>

            <Link href="/configuracoes/localizacao">
              <div className="flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800">Localização</h3>
                  <p className="text-sm text-gray-600">Alterar região da busca</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>

            <Link href="/configuracoes/cachorros-doados">
              <div className="flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800">Cachorros Doados</h3>
                  <p className="text-sm text-gray-600">Perfis dos cachorros para doação</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          </div>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full h-12 rounded-xl text-base font-semibold mt-6"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
