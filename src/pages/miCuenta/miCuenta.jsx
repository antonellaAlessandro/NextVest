import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Mi cuenta</h2>

        {/* Datos personales */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="font-medium text-gray-800 mb-4">Datos personales</h3>

          {mensajeDatos && (
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {mensajeDatos}
            </div>
          )}
          {errorDatos && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {errorDatos}
            </div>
          )}

          <form onSubmit={handleActualizarDatos} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                value={usuario.email}
                disabled
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Guardar cambios
            </button>
          </form>
        </div>

        {/* Cambiar contraseña */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="font-medium text-gray-800 mb-4">Cambiar contraseña</h3>

          {mensajeContrasenia && (
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {mensajeContrasenia}
            </div>
          )}
          {errorContrasenia && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {errorContrasenia}
            </div>
          )}

          <form onSubmit={handleCambiarContrasenia} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
              <input
                type="password"
                value={contraseniaActual}
                onChange={(e) => setContraseniaActual(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña nueva</label>
              <input
                type="password"
                value={contraseniaNueva}
                onChange={(e) => setContraseniaNueva(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Cambiar contraseña
            </button>
          </form>
        </div>

        {/* Representante legal */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="font-medium text-gray-800 mb-4">Representante legal</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-1">Nombre completo</p>
              <p className="text-gray-800">{representante?.nombre} {representante?.apellido}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Email</p>
              <p className="text-gray-800">{representante?.email}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Estos datos son de solo lectura y no pueden modificarse.
          </p>
        </div>

        {/* Perfil de riesgo */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="font-medium text-gray-800 mb-2">Perfil de riesgo</h3>
          <p className="text-sm text-gray-500 mb-4">
            Podés repetir el cuestionario en cualquier momento.
          </p>
          <button
            onClick={() => navigate('/perfil-riesgo')}
            className="text-sm text-blue-600 hover:underline"
          >
            Repetir cuestionario →
          </button>
        </div>
      </div>
    </div>
  )
}

export default MiCuenta