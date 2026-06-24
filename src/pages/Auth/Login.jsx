import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { login } from '../../services/auth.service'
import FondoLR from '../../components/FondoLR'

function Login() {
  const [email, setEmail] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)

    try {
      const datos = await login(email, contrasenia)
      iniciarSesion(datos.access_token, datos.rol)
      if (datos.rol === 'admin') {
        navigate('/admin/usuarios')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative">
      <FondoLR />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl w-full max-w-md relative z-10"
      >
        <Link to="/" className="text-2xl font-bold tracking-tight mb-1 inline-block">
          Next<span className="text-cyan-400">Vest</span>
        </Link>
        <p className="text-slate-400 mb-8">Iniciá sesión en tu cuenta</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-cyan-500 text-slate-950 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors disabled:opacity-50"
          >
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          ¿No tenés cuenta?{' '}
          <Link to="/registro" className="text-cyan-400 font-medium hover:underline">
            Registrate
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login