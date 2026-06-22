import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { obtenerHistorial } from '../../services/portafolio.service'
import Navbar from '../../components/Navbar'

function Historial() {
  const [ordenes, setOrdenes] = useState([])
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarHistorial() {
      try {
        const datos = await obtenerHistorial()
        setOrdenes(datos)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarHistorial()
  }, [])

  const ordenesFiltradas = ordenes.filter((orden) => {
    if (filtroTipo === 'todos') return true
    return orden.tipo === filtroTipo
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/portafolio"
          className="text-sm text-slate-400 hover:text-white transition-colors inline-block mb-4"
        >
          ← Volver al portafolio
        </Link>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Historial de operaciones
        </motion.h2>

        <div className="flex gap-2 mb-6">
          {['todos', 'compra', 'venta'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
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
          <p className="text-slate-500">Cargando...</p>
        ) : ordenesFiltradas.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-400">No hay operaciones para mostrar.</p>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Unidades</th>
                  <th className="px-6 py-3">Precio</th>
                  <th className="px-6 py-3">Monto</th>
                </tr>
              </thead>
              <tbody>
                {ordenesFiltradas.map((orden) => (
                  <tr key={orden.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {orden.fecha} {orden.hora}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        orden.tipo === 'compra'
                          ? 'bg-cyan-500/10 text-cyan-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {orden.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{orden.cantidad}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      ${orden.precio_unitario?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      ${(orden.precio_unitario * orden.cantidad).toLocaleString('es-AR')}
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

export default Historial