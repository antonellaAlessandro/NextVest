import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { obtenerInstrumentos } from '../../services/mercado.service'
import Navbar from '../../components/Navbar'
import TarjetaInstrumento from '../../components/TarjetaInstrumento'

const TIPOS = ['Todos', 'FCI', 'Bono', 'Cedear', 'Accion']

function Mercado() {
  const [instrumentos, setInstrumentos] = useState([])
  const [filtroTipo, setFiltroTipo] = useState('Todos')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarInstrumentos() {
      setCargando(true)
      try {
        const tipo = filtroTipo === 'Todos' ? null : filtroTipo
        const datos = await obtenerInstrumentos(tipo)
        setInstrumentos(datos)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarInstrumentos()
  }, [filtroTipo])

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-cyan-500/5 blur-3xl rounded-full" />

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-8">
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
            Mercado
          </motion.h2>

          <div className="flex gap-2 mb-6">
            {TIPOS.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setFiltroTipo(tipo)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filtroTipo === tipo
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>

          {cargando ? (
            <p className="text-slate-500">Cargando instrumentos...</p>
          ) : instrumentos.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
              <p className="text-slate-400">No hay instrumentos disponibles para tu perfil en este filtro.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {instrumentos.map((inst, index) => (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TarjetaInstrumento instrumento={inst} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mercado