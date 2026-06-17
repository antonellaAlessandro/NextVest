import { useState } from 'react'
import { Link } from 'react-router-dom'
import { reenviarToken } from '../../services/auth.service'

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⏳</span>
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-2">Cuenta pendiente</h1>
        <p className="text-gray-500 text-sm mb-8">
          Tu cuenta está esperando la autorización de tu representante legal.
          Le enviamos un email con un link para aprobar o rechazar tu cuenta.
        </p>

        {mensaje && (
          <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500 mb-4">
            ¿El link venció? Reenviar autorización:
          </p>

          <form onSubmit={handleReenviar} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {cargando ? 'Reenviando...' : 'Reenviar email'}
            </button>
          </form>
        </div>

        <Link to="/login" className="block text-sm text-blue-600 hover:underline mt-6">
          Volver al login
        </Link>
      </div>
    </div>
  )
}

export default CuentaPendiente