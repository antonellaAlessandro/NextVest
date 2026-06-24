import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavbarAdmin() {
  const { cerrarSesion } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { to: '/admin/usuarios', label: 'Usuarios' },
    { to: '/admin/instrumentos', label: 'Instrumentos' },
    { to: '/admin/configuracion', label: 'Configuración' }
  ]

  function handleCerrarSesion() {
  navigate('/')
  cerrarSesion()
}

  return (
    <nav className="bg-black border-b border-slate-800 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <p className="text-lg font-bold tracking-tight text-white">
          Next<span className="text-cyan-400">Vest</span>
          <span className="text-slate-500 font-normal text-sm ml-2">admin</span>
        </p>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors ${
                location.pathname === link.to
                  ? 'text-cyan-400 font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleCerrarSesion}
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