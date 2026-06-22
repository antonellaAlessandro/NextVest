import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { obtenerSaldo, cargarSaldo } from '../../services/billetera.service'
import { obtenerHistorial } from '../../services/portafolio.service'
import Navbar from '../../components/Navbar'

function Billetera() {
  const [saldo, setSaldo] = useState(0)
  const [historial, setHistorial] = useState([])
  const [monto, setMonto] = useState('')
  const [mensaje, setMensaje] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [procesando, setProcesando] = useState(false)

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      const [datosSaldo, datosHistorial] = await Promise.all([
        obtenerSaldo(),
        obtenerHistorial()
      ])
      setSaldo(datosSaldo.saldo_disponible)
      setHistorial(datosHistorial)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  async function handleCargarSaldo(e) {
    e.preventDefault()
    setProcesando(true)
    setError(null)
    setMensaje(null)

    try {
      const resultado = await cargarSaldo(parseFloat(monto))
      setSaldo(resultado.saldo_disponible)
      setMensaje(`Se cargaron $${parseFloat(monto).toLocaleString('es-AR')} a tu billetera.`)
      setMonto('')
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al cargar saldo')
    } finally {
      setProcesando(false)
    }
  }

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <Link
          to="/dashboard"
          className="text-sm text-slate-400 hover:text-white transition-colors inline-block mb-4"
        >
          ← Volver al dashboard
        </Link>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Billetera
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-6"
        >
          <p className="text-sm text-slate-400 mb-1">Saldo disponible</p>
          <p className="text-3xl font-bold text-white mb-6">
            ${saldo?.toLocaleString('es-AR')}
          </p>

          {mensaje && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {mensaje}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleCargarSaldo} className="flex gap-3">
            <input
              type="number"
              min="1"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Monto a cargar"
              className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              required
            />
            <button
              type="submit"
              disabled={procesando}
              className="bg-cyan-500 text-slate-950 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors disabled:opacity-50"
            >
              {procesando ? 'Cargando...' : 'Cargar saldo'}
            </button>
          </form>
        </motion.div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800">
            <h3 className="font-medium text-white">Movimientos recientes</h3>
          </div>

          {historial.length === 0 ? (
            <p className="text-slate-500 text-sm px-6 py-8 text-center">
              No hay movimientos todavía.
            </p>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {historial.slice(0, 10).map((orden) => (
                <div key={orden.id} className="px-6 py-4 flex justify-between items-center hover:bg-slate-800/30 transition-colors">
                  <div>
                    <p className="text-sm text-white capitalize">{orden.tipo}</p>
                    <p className="text-xs text-slate-500">{orden.fecha} {orden.hora}</p>
                  </div>
                  <p className={`text-sm font-medium ${orden.tipo === 'compra' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {orden.tipo === 'compra' ? '-' : '+'}${(orden.precio_unitario * orden.cantidad).toLocaleString('es-AR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Billetera