import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../services/api'
import NavbarAdmin from '../../components/NavbarAdmin'

function DetalleUsuario() {
  const { id } = useParams()
  const [detalle, setDetalle] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarDetalle() {
      try {
        const respuesta = await api.get(`/admin/usuarios/${id}`)
        setDetalle(respuesta.data)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarDetalle()
  }, [id])

  if (cargando) {
    return <p className="text-slate-500 p-8 bg-black min-h-screen">Cargando...</p>
  }

  if (!detalle) {
    return <p className="text-slate-500 p-8 bg-black min-h-screen">Usuario no encontrado</p>
  }

  const { usuario, representante, historial, portafolio } = detalle

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarAdmin />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link
          to="/admin/usuarios"
          className="text-sm text-slate-400 hover:text-white transition-colors inline-block mb-6"
        >
          ← Volver a usuarios
        </Link>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold mb-6"
        >
          {usuario.nombre} {usuario.apellido}
        </motion.h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Datos personales */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
          >
            <h3 className="font-medium text-white mb-4">Datos personales</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">DNI</span>
                <span className="text-slate-300">{usuario.dni}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="text-slate-300">{usuario.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fecha de nacimiento</span>
                <span className="text-slate-300">{usuario.fecha_nacimiento}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estado</span>
                <span className={`capitalize ${
                  usuario.estado_cuenta === 'activa' ? 'text-emerald-400' :
                  usuario.estado_cuenta === 'pendiente' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {usuario.estado_cuenta}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Representante legal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
          >
            <h3 className="font-medium text-white mb-4">Representante legal</h3>
            {representante ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nombre</span>
                  <span className="text-slate-300">{representante.nombre} {representante.apellido}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email</span>
                  <span className="text-slate-300">{representante.email}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Sin datos de representante</p>
            )}
          </motion.div>
        </div>

        {/* Portafolio */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">Portafolio actual</h3>
            <p className="text-lg font-bold text-cyan-400">
              ${portafolio.valor_total?.toLocaleString('es-AR')}
            </p>
          </div>

          {portafolio.posiciones.length === 0 ? (
            <p className="text-sm text-slate-500">Sin posiciones</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                  <th className="py-2">Instrumento</th>
                  <th className="py-2">Unidades</th>
                  <th className="py-2">Precio compra</th>
                  <th className="py-2">Precio actual</th>
                </tr>
              </thead>
              <tbody>
                {portafolio.posiciones.map((pos, index) => (
                  <tr key={index} className="border-b border-slate-800/50">
                    <td className="py-3 text-sm text-white">{pos.nombre}</td>
                    <td className="py-3 text-sm text-slate-300">{pos.unidades}</td>
                    <td className="py-3 text-sm text-slate-300">${pos.precio_prom_compra?.toLocaleString('es-AR')}</td>
                    <td className="py-3 text-sm text-slate-300">${pos.precio_actual?.toLocaleString('es-AR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

        {/* Historial */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
        >
          <h3 className="font-medium text-white mb-4">Historial de operaciones</h3>

          {historial.length === 0 ? (
            <p className="text-sm text-slate-500">Sin operaciones registradas</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                  <th className="py-2">Fecha</th>
                  <th className="py-2">Tipo</th>
                  <th className="py-2">Cantidad</th>
                  <th className="py-2">Precio</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((orden) => (
                  <tr key={orden.id} className="border-b border-slate-800/50">
                    <td className="py-3 text-sm text-slate-300">{orden.fecha} {orden.hora}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        orden.tipo === 'compra' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {orden.tipo}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-slate-300">{orden.cantidad}</td>
                    <td className="py-3 text-sm text-slate-300">${orden.precio_unitario?.toLocaleString('es-AR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default DetalleUsuario