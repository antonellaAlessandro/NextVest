import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../services/api'
import NavbarAdmin from '../../components/NavbarAdmin'

function GestionInstrumentos() {
  const [instrumentos, setInstrumentos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [error, setError] = useState(null)
  const [actualizando, setActualizando] = useState(false)
  const [mensajeActualizacion, setMensajeActualizacion] = useState(null)

  const [nuevoInstrumento, setNuevoInstrumento] = useState({
    nombre: '', ticker: '', tipo: 'FCI', descripcion: '', perfil_minimo: 'conservador'
  })

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

  async function actualizarPrecios() {
    setActualizando(true)
    setMensajeActualizacion(null)
    try {
      const respuesta = await api.post('/admin/actualizar-precios')
      setMensajeActualizacion(
        `Actualizados: ${respuesta.data.actualizados.length} · Fallidos: ${respuesta.data.fallidos.length}`
      )
      cargarInstrumentos()
    } catch (err) {
      console.error(err)
    } finally {
      setActualizando(false)
    }
  }

  if (cargando) {
    return <p className="text-slate-500 p-8 bg-black min-h-screen">Cargando...</p>
  }

  const inputClass = "border border-slate-700 bg-slate-800/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarAdmin />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold"
          >
            Gestión de instrumentos
          </motion.h2>
          <div className="flex gap-2">
            <button
              onClick={actualizarPrecios}
              disabled={actualizando}
              className="border border-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:border-cyan-500/30 hover:text-white transition-colors disabled:opacity-50"
            >
              {actualizando ? 'Actualizando...' : '↻ Actualizar precios'}
            </button>
            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              className="bg-cyan-500 text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors"
            >
              {mostrarForm ? 'Cancelar' : '+ Nuevo instrumento'}
            </button>
          </div>
        </div>

        {mensajeActualizacion && (
          <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {mensajeActualizacion}
          </div>
        )}

        {mostrarForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-6"
          >
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleCrear} className="grid grid-cols-2 gap-4">
              <input
                name="nombre" placeholder="Nombre" value={nuevoInstrumento.nombre}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <input
                name="ticker" placeholder="Ticker" value={nuevoInstrumento.ticker}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <select
                name="tipo" value={nuevoInstrumento.tipo} onChange={handleChange}
                className={inputClass}
              >
                <option value="FCI">FCI</option>
                <option value="Bono">Bono</option>
                <option value="Cedear">Cedear</option>
                <option value="Accion">Acción</option>
              </select>
              <select
                name="perfil_minimo" value={nuevoInstrumento.perfil_minimo} onChange={handleChange}
                className={inputClass}
              >
                <option value="conservador">Conservador</option>
                <option value="moderado">Moderado</option>
              </select>
              <textarea
                name="descripcion" placeholder="Descripción" value={nuevoInstrumento.descripcion}
                onChange={handleChange}
                className={`${inputClass} col-span-2`}
              />
              <button
                type="submit"
                className="bg-cyan-500 text-slate-950 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors col-span-2"
              >
                Crear instrumento
              </button>
            </form>
          </motion.div>
        )}

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-800">
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Perfil mínimo</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {instrumentos.map((inst) => (
                <tr key={inst.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-white">{inst.nombre}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{inst.tipo}</td>
                  <td className="px-6 py-4 text-sm text-slate-300 capitalize">{inst.perfil_minimo}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      inst.activo ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {inst.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActivo(inst.id, inst.activo)}
                      className="text-xs text-cyan-400 hover:underline"
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
    </div>
  )
}

export default GestionInstrumentos