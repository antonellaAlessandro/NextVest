import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleCerrarSesion() {
    cerrarSesion()
    navigate('/login')
  }

  const links = [
    { to: '/mercado', label: 'Mercado' },
    { to: '/portafolio', label: 'Portafolio' },
    { to: '/billetera', label: 'Billetera' },
    { to: '/mi-cuenta', label: 'Mi cuenta' }
  ]

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-lg font-bold text-blue-600">
          NextVest
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors ${
                location.pathname === link.to
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
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