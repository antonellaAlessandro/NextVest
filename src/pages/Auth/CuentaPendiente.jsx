import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { reenviarToken } from '../../services/auth.service'
import FondoLR from '../../components/FondoLR'

function CuentaPendiente() {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  async function handleReenviar(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)
    setMensaje(null)

    try {
      await reenviarToken(email)
      setMensaje('Token reenviado. Revisá el email del representante legal.')
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al reenviar el token')
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
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl w-full max-w-md text-center relative z-10"
      >
        <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⏳</span>
        </div>

        <h1 className="text-xl font-bold mb-2">Cuenta pendiente</h1>
        <p className="text-slate-400 text-sm mb-8">
          Tu cuenta está esperando la autorización de tu representante legal.
          Le enviamos un email con un link para aprobar o rechazar tu cuenta.
        </p>

        {mensaje && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-400 mb-4">
            ¿El link venció? Reenviar autorización:
          </p>

          <form onSubmit={handleReenviar} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              required
            />
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-cyan-500 text-slate-950 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors disabled:opacity-50"
            >
              {cargando ? 'Reenviando...' : 'Reenviar email'}
            </button>
          </form>
        </div>

        <Link to="/login" className="block text-sm text-cyan-400 hover:underline mt-6">
          Volver al login
        </Link>
      </motion.div>
    </div>
  )
}

export default CuentaPendiente