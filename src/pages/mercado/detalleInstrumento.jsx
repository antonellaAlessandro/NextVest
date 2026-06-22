import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { obtenerInstrumento } from '../../services/mercado.service'
import { obtenerPortafolio } from '../../services/portafolio.service'
import Navbar from '../../components/Navbar'

function DetalleInstrumento() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [instrumento, setInstrumento] = useState(null)
  const [tieneUnidades, setTieneUnidades] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [datosInstrumento, datosPortafolio] = await Promise.all([
          obtenerInstrumento(id),
          obtenerPortafolio()
        ])
        setInstrumento(datosInstrumento)
        const posicion = datosPortafolio.posiciones.find(
          (p) => p.instrumento_id === parseInt(id)
        )
        setTieneUnidades(!!posicion)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [id])

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </div>
    )
  }

  if (!instrumento) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500">Instrumento no encontrado</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/mercado')}
          className="text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          ← Volver al mercado
        </button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">{instrumento.nombre}</h2>
              <p className="text-sm text-slate-500">{instrumento.ticker} · {instrumento.tipo}</p>
            </div>
            <span className="text-xs bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full">
              Perfil {instrumento.perfil_minimo}
            </span>
          </div>

          <p className="text-3xl font-bold text-white mb-6">
            ${instrumento.precio_actual?.toLocaleString('es-AR')}
          </p>

          <p className="text-sm text-slate-400 mb-8">
            {instrumento.descripcion}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/mercado/${id}/orden?tipo=compra`)}
              className="flex-1 bg-cyan-500 text-slate-950 py-3 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors"
            >
              Comprar
            </button>
            {tieneUnidades && (
              <button
                onClick={() => navigate(`/mercado/${id}/orden?tipo=venta`)}
                className="flex-1 border border-slate-700 text-slate-300 py-3 rounded-lg text-sm font-medium hover:border-slate-500 hover:text-white transition-colors"
              >
                Vender
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DetalleInstrumento