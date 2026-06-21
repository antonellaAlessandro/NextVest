import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl font-bold text-blue-600 mb-4">404</p>
        <p className="text-gray-500 mb-8">Esta página no existe.</p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFound