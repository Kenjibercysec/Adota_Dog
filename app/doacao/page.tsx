"use client"

import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"

// Componente de QR Code simples (não válido, apenas visual)
function QRCode() {
  const size = 25 // 25x25 grid
  
  // Gera um padrão aleatório de quadrados para simular um QR code
  const generateQRPattern = () => {
    const pattern: boolean[][] = []
    
    for (let i = 0; i < size; i++) {
      pattern[i] = []
      for (let j = 0; j < size; j++) {
        // Cria padrões típicos de QR code (marcadores de posição nos cantos)
        if (
          (i < 7 && j < 7) || // Canto superior esquerdo
          (i < 7 && j >= size - 7) || // Canto superior direito
          (i >= size - 7 && j < 7) // Canto inferior esquerdo
        ) {
          // Padrão de marcador de posição (quadrado com quadrado interno)
          const inMarker = (i >= 2 && i < 5 && j >= 2 && j < 5) ||
                          (i < 2 || i >= 5 || j < 2 || j >= 5)
          pattern[i][j] = inMarker
        } else {
          // Padrão aleatório para o resto
          pattern[i][j] = Math.random() > 0.5
        }
      }
    }
    return pattern
  }

  const pattern = generateQRPattern()
  const cellSize = 8
  const padding = 20
  const totalSize = size * cellSize + padding * 2

  return (
    <svg
      width={totalSize}
      height={totalSize}
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      className="border-4 border-gray-800 rounded-lg bg-white"
    >
      <rect width={totalSize} height={totalSize} fill="white" />
      {pattern.map((row, i) =>
        row.map((filled, j) => (
          <rect
            key={`${i}-${j}`}
            x={padding + j * cellSize}
            y={padding + i * cellSize}
            width={cellSize}
            height={cellSize}
            fill={filled ? "#000000" : "#FFFFFF"}
          />
        ))
      )}
    </svg>
  )
}

export default function DoacaoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link href="/configuracoes" className="inline-block">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Heart className="h-8 w-8 text-orange-500" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Doação</h1>
            <p className="text-sm text-gray-600">
              Ajude-nos a continuar resgatando e cuidando de cães
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Escaneie o QR Code</h2>
              <div className="flex justify-center">
                <QRCode />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Use o aplicativo do seu banco para escanear e fazer uma doação
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 space-y-2">
              <h3 className="font-semibold text-gray-800">Chave PIX</h3>
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <p className="text-sm font-mono text-gray-700 break-all">
                  adotadog@doacao.com.br
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("adotadog@doacao.com.br")
                  alert("Chave PIX copiada!")
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Copiar Chave PIX
              </button>
            </div>

            <div className="text-center space-y-2 pt-2">
              <p className="text-xs text-gray-500">
                Sua doação ajuda a manter o Adota Dog funcionando e a cuidar dos cães resgatados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

