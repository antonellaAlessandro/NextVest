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
    <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-lg font-bold tracking-tight text-white">
          Next<span className="text-cyan-400">Vest</span>
        </Link>

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

export default Navbar