import { useState, useEffect } from 'react'
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
    return <p className="text-gray-400 p-8">Cargando...</p>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Gestión de usuarios</h2>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{u.nombre} {u.apellido}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                      u.estado_cuenta === 'activa' ? 'bg-green-50 text-green-600' :
                      u.estado_cuenta === 'pendiente' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {u.estado_cuenta}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {u.estado_cuenta === 'pendiente' && (
                      <button
                        onClick={() => cambiarEstado(u.id, 'activa')}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Activar
                      </button>
                    )}
                    {u.estado_cuenta === 'activa' && (
                      <button
                        onClick={() => cambiarEstado(u.id, 'suspendida')}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Suspender
                      </button>
                    )}
                    {u.estado_cuenta === 'suspendida' && (
                      <button
                        onClick={() => cambiarEstado(u.id, 'activa')}
                        className="text-xs text-blue-600 hover:underline"
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