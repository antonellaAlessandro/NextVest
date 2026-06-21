import { useState, useEffect } from 'react'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

function GestionInstrumentos() {
  const [instrumentos, setInstrumentos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [error, setError] = useState(null)

  const [nuevoInstrumento, setNuevoInstrumento] = useState({
    nombre: '', ticker: '', tipo: 'FCI', descripcion: '', perfil_minimo: 'conservador'
  })

  const { cerrarSesion } = useAuth()

  useEffect(() => {
    cargarInstrumentos()
  }, [])

  async function cargarInstrumentos() {
    try {
      const respuesta = await api.get('/admin/instrumentos')
      setInstrumentos(respuesta.data)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  function handleChange(e) {
    setNuevoInstrumento({ ...nuevoInstrumento, [e.target.name]: e.target.value })
  }

  async function handleCrear(e) {
    e.preventDefault()
    setError(null)
    try {
      await api.post('/admin/instrumentos', nuevoInstrumento)
      setNuevoInstrumento({ nombre: '', ticker: '', tipo: 'FCI', descripcion: '', perfil_minimo: 'conservador' })
      setMostrarForm(false)
      cargarInstrumentos()
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al crear instrumento')
    }
  }

  async function toggleActivo(id, activo) {
    try {
      await api.patch(`/admin/instrumentos/${id}/estado?activo=${!activo}`)
      cargarInstrumentos()
    } catch (err) {
      console.error(err)
    }
  }

  if (cargando) {
    return <p className="text-gray-400 p-8">Cargando...</p>
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gestión de instrumentos</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setMostrarForm(!mostrarForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {mostrarForm ? 'Cancelar' : '+ Nuevo instrumento'}
          </button>
          <button onClick={cerrarSesion} className="text-sm text-red-500 hover:text-red-600">
            Cerrar sesión
          </button>
        </div>
      </div>

      {mostrarForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleCrear} className="grid grid-cols-2 gap-4">
            <input
              name="nombre" placeholder="Nombre" value={nuevoInstrumento.nombre}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
              required
            />
            <input
              name="ticker" placeholder="Ticker" value={nuevoInstrumento.ticker}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
              required
            />
            <select
              name="tipo" value={nuevoInstrumento.tipo} onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
            >
              <option value="FCI">FCI</option>
              <option value="Bono">Bono</option>
              <option value="Cedear">Cedear</option>
              <option value="Accion">Acción</option>
            </select>
            <select
              name="perfil_minimo" value={nuevoInstrumento.perfil_minimo} onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm"
            >
              <option value="conservador">Conservador</option>
              <option value="moderado">Moderado</option>
            </select>
            <textarea
              name="descripcion" placeholder="Descripción" value={nuevoInstrumento.descripcion}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm col-span-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors col-span-2"
            >
              Crear instrumento
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Perfil mínimo</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instrumentos.map((inst) => (
              <tr key={inst.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{inst.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{inst.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{inst.perfil_minimo}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    inst.activo ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {inst.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActivo(inst.id, inst.activo)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {inst.activo ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GestionInstrumentos