import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavbarAdmin() {
  const { cerrarSesion } = useAuth()
  const location = useLocation()

  const links = [
    { to: '/admin/usuarios', label: 'Usuarios' },
    { to: '/admin/instrumentos', label: 'Instrumentos' },
    { to: '/admin/configuracion', label: 'Configuración' }
  ]

  return (
    <nav className="bg-gray-900 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <p className="text-lg font-bold text-white">NextVest Admin</p>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors ${
                location.pathname === link.to
                  ? 'text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={cerrarSesion}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavbarAdmin