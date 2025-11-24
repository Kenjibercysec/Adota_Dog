export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  )
}
