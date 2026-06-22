import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../services/api'
import NavbarAdmin from '../../components/NavbarAdmin'

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarUsuarios()
  }, [])

  async function cargarUsuarios() {
    try {
      const respuesta = await api.get('/admin/usuarios')
      setUsuarios(respuesta.data)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  async function cambiarEstado(usuarioId, nuevoEstado) {
    setError(null)
    try {
      await api.patch(`/admin/usuarios/${usuarioId}/estado?estado=${nuevoEstado}`)
      cargarUsuarios()
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al cambiar estado')
    }
  }

  if (cargando) {
    return <p className="text-slate-500 p-8 bg-black min-h-screen">Cargando...</p>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarAdmin />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold mb-6"
        >
          Gestión de usuarios
        </motion.h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-white">{u.nombre} {u.apellido}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      u.estado_cuenta === 'activa' ? 'bg-emerald-500/10 text-emerald-400' :
                      u.estado_cuenta === 'pendiente' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {u.estado_cuenta}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {u.estado_cuenta === 'pendiente' && (
                      <button
                        onClick={() => cambiarEstado(u.id, 'activa')}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        Activar
                      </button>
                    )}
                    {u.estado_cuenta === 'activa' && (
                      <button
                        onClick={() => cambiarEstado(u.id, 'suspendida')}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Suspender
                      </button>
                    )}
                    {u.estado_cuenta === 'suspendida' && (
                      <button
                        onClick={() => cambiarEstado(u.id, 'activa')}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        Reactivar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GestionUsuarios