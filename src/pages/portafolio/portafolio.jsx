import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { obtenerPortafolio } from '../../services/portafolio.service'
import Navbar from '../../components/Navbar'
import GraficoPortafolio from '../../components/GraficoPortafolio'

function Portafolio() {
  const [portafolio, setPortafolio] = useState(null)
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function cargarPortafolio() {
      try {
        const datos = await obtenerPortafolio()
        setPortafolio(datos)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarPortafolio()
  }, [])

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

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/dashboard"
          className="text-sm text-slate-400 hover:text-white transition-colors inline-block mb-4"
        >
          ← Volver al dashboard
        </Link>

        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold"
          >
            Mi portafolio
          </motion.h2>
          <button
            onClick={() => navigate('/historial')}
            className="text-sm text-cyan-400 hover:underline"
          >
            Ver historial →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
          >
            <p className="text-sm text-slate-400 mb-1">Valor total</p>
            <p className="text-2xl font-bold text-white">
              ${portafolio?.valor_total?.toLocaleString('es-AR')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
          >
            <p className="text-sm text-slate-400 mb-1">Ganancia/Pérdida</p>
            <p className={`text-2xl font-bold ${portafolio?.ganancia_perdida >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              ${portafolio?.ganancia_perdida?.toLocaleString('es-AR')}
              <span className="text-sm font-normal ml-2">
                ({portafolio?.ganancia_pct >= 0 ? '+' : ''}{portafolio?.ganancia_pct}%)
              </span>
            </p>
          </motion.div>
        </div>

        <div className="mb-8">
          <GraficoPortafolio posiciones={portafolio?.posiciones} />
        </div>

        {portafolio?.posiciones?.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-400 mb-4">Todavía no tenés posiciones.</p>
            <button
              onClick={() => navigate('/mercado')}
              className="bg-cyan-500 text-slate-950 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors"
            >
              Ir al mercado
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                  <th className="px-6 py-3">Instrumento</th>
                  <th className="px-6 py-3">Unidades</th>
                  <th className="px-6 py-3">Precio compra</th>
                  <th className="px-6 py-3">Precio actual</th>
                  <th className="px-6 py-3">Variación</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {portafolio?.posiciones?.map((pos) => (
                  <tr key={pos.instrumento_id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white text-sm">{pos.nombre}</p>
                      <p className="text-xs text-slate-500">{pos.ticker}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{pos.unidades}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      ${pos.precio_prom_compra?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      ${pos.precio_actual?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${pos.variacion_pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pos.variacion_pct >= 0 ? '+' : ''}{pos.variacion_pct}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      ${pos.valor_actual?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/mercado/${pos.instrumento_id}`)}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        Vender
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Portafolio