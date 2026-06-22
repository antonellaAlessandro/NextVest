import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { obtenerPortafolio } from '../../services/portafolio.service'
import { obtenerSaldo } from '../../services/billetera.service'
import Navbar from '../../components/Navbar'

function obtenerSaludo() {
  const hora = new Date().getHours()
  if (hora < 12) return 'Buen día'
  if (hora < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function Dashboard() {
  const [portafolio, setPortafolio] = useState(null)
  const [saldo, setSaldo] = useState(null)
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [datosPortafolio, datosSaldo] = await Promise.all([
          obtenerPortafolio(),
          obtenerSaldo()
        ])
        setPortafolio(datosPortafolio)
        setSaldo(datosSaldo.saldo_disponible)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [])

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-3xl rounded-full -z-0" />
      <div className="absolute top-40 left-0 w-[400px] h-[300px] bg-cyan-500/5 blur-3xl rounded-full -z-0" />

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold">
              {obtenerSaludo()} <span className="text-cyan-400">👋</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Esto es lo que está pasando con tu portafolio
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
            >
              <p className="text-sm text-slate-400 mb-1">Saldo disponible</p>
              <p className="text-2xl font-bold text-white">
                ${saldo?.toLocaleString('es-AR')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
            >
              <p className="text-sm text-slate-400 mb-1">Valor del portafolio</p>
              <p className="text-2xl font-bold text-white">
                ${portafolio?.valor_total?.toLocaleString('es-AR')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-colors"
            >
              <p className="text-sm text-slate-400 mb-1">Ganancia/Pérdida</p>
              <p className={`text-2xl font-bold ${portafolio?.ganancia_perdida >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${portafolio?.ganancia_perdida?.toLocaleString('es-AR')}
              </p>
            </motion.div>
          </div>

          {portafolio?.posiciones?.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
              <p className="text-slate-400 mb-4">Todavía no tenés posiciones en tu portafolio.</p>
              <button
                onClick={() => navigate('/mercado')}
                className="bg-cyan-500 text-slate-950 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors"
              >
                Ir al mercado
              </button>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800">
                <h3 className="font-medium text-white">Mis posiciones</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                    <th className="px-6 py-3">Instrumento</th>
                    <th className="px-6 py-3">Unidades</th>
                    <th className="px-6 py-3">Precio actual</th>
                    <th className="px-6 py-3">Variación</th>
                    <th className="px-6 py-3">Valor</th>
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
                      <td className="px-6 py-4 text-sm text-slate-300">${pos.precio_actual?.toLocaleString('es-AR')}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${pos.variacion_pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {pos.variacion_pct >= 0 ? '+' : ''}{pos.variacion_pct}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">${pos.valor_actual?.toLocaleString('es-AR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard