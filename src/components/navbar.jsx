import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  function handleCerrarSesion() {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-lg font-bold text-blue-600">
          NextVest
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/mercado" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Mercado
          </Link>
          <Link to="/portafolio" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Portafolio
          </Link>
          <Link to="/billetera" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Billetera
          </Link>
          <Link to="/mi-cuenta" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Mi cuenta
          </Link>
          <button
            onClick={handleCerrarSesion}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar