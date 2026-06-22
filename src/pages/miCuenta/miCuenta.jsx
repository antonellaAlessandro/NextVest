import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../../services/api'
import { actualizarPerfil, cambiarContrasenia, obtenerPerfil } from '../../services/usuario.service'
import Navbar from '../../components/Navbar'

function MiCuenta() {
  const [usuario, setUsuario] = useState(null)
  const [representante, setRepresentante] = useState(null)
  const [cargando, setCargando] = useState(true)

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [mensajeDatos, setMensajeDatos] = useState(null)
  const [errorDatos, setErrorDatos] = useState(null)

  const [contraseniaActual, setContraseniaActual] = useState('')
  const [contraseniaNueva, setContraseniaNueva] = useState('')
  const [mensajeContrasenia, setMensajeContrasenia] = useState(null)
  const [errorContrasenia, setErrorContrasenia] = useState(null)

  const navigate = useNavigate()

  const inputClass = "w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5"

  useEffect(() => {
    async function cargarDatos() {
      try {
        const datosUsuario = await obtenerPerfil()
        setUsuario(datosUsuario)
        setNombre(datosUsuario.nombre)
        setApellido(datosUsuario.apellido)

        const respRepresentante = await api.get('/usuarios/me/representante')
        setRepresentante(respRepresentante.data)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [])

  async function handleActualizarDatos(e) {
    e.preventDefault()
    setErrorDatos(null)
    setMensajeDatos(null)
    try {
      await actualizarPerfil({ nombre, apellido })
      setMensajeDatos('Datos actualizados correctamente.')
    } catch (err) {
      setErrorDatos(err.response?.data?.detail || 'Error al actualizar datos')
    }
  }

  async function handleCambiarContrasenia(e) {
    e.preventDefault()
    setErrorContrasenia(null)
    setMensajeContrasenia(null)
    try {
      await cambiarContrasenia({
        contrasenia_actual: contraseniaActual,
        contrasenia_nueva: contraseniaNueva
      })
      setMensajeContrasenia('Contraseña actualizada correctamente.')
      setContraseniaActual('')
      setContraseniaNueva('')
    } catch (err) {
      setErrorContrasenia(err.response?.data?.detail || 'Error al cambiar contraseña')
    }
  }

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

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <Link
          to="/dashboard"
          className="text-sm text-slate-400 hover:text-white transition-colors inline-block"
        >
          ← Volver al dashboard
        </Link>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          Mi cuenta
        </motion.h2>

        {/* Datos personales */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
        >
          <h3 className="font-medium text-white mb-4">Datos personales</h3>

          {mensajeDatos && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {mensajeDatos}
            </div>
          )}
          {errorDatos && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {errorDatos}
            </div>
          )}

          <form onSubmit={handleActualizarDatos} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Apellido</label>
                <input
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                value={usuario.email}
                disabled
                className="w-full bg-slate-800/30 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-500"
              />
            </div>

            <button
              type="submit"
              className="bg-cyan-500 text-slate-950 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors"
            >
              Guardar cambios
            </button>
          </form>
        </motion.div>

        {/* Cambiar contraseña */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
        >
          <h3 className="font-medium text-white mb-4">Cambiar contraseña</h3>

          {mensajeContrasenia && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {mensajeContrasenia}
            </div>
          )}
          {errorContrasenia && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
              {errorContrasenia}
            </div>
          )}

          <form onSubmit={handleCambiarContrasenia} className="space-y-4">
            <div>
              <label className={labelClass}>Contraseña actual</label>
              <input
                type="password"
                value={contraseniaActual}
                onChange={(e) => setContraseniaActual(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Contraseña nueva</label>
              <input
                type="password"
                value={contraseniaNueva}
                onChange={(e) => setContraseniaNueva(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-500 text-slate-950 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors"
            >
              Cambiar contraseña
            </button>
          </form>
        </motion.div>

        {/* Representante legal */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
        >
          <h3 className="font-medium text-white mb-4">Representante legal</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 text-xs mb-1">Nombre completo</p>
              <p className="text-white">{representante?.nombre} {representante?.apellido}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs mb-1">Email</p>
              <p className="text-white">{representante?.email}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Estos datos son de solo lectura y no pueden modificarse.
          </p>
        </motion.div>

        {/* Perfil de riesgo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
        >
          <h3 className="font-medium text-white mb-2">Perfil de riesgo</h3>
          <p className="text-sm text-slate-400 mb-4">
            Podés repetir el cuestionario en cualquier momento.
          </p>
          <button
            onClick={() => navigate('/perfil-riesgo')}
            className="text-sm text-cyan-400 hover:underline"
          >
            Repetir cuestionario →
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default MiCuenta