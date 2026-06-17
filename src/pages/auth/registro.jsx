import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registrar } from '../../services/auth.service'

function Registro() {
  const [paso, setPaso] = useState(1)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: '',
    email: '',
    contrasenia: '',
    representante: {
      nombre: '',
      apellido: '',
      dni: '',
      email: ''
    }
  })

  const navigate = useNavigate()

  function handleChange(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  function handleChangeRepresentante(e) {
    setFormulario({
      ...formulario,
      representante: {
        ...formulario.representante,
        [e.target.name]: e.target.value
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setCargando(true)
    setError(null)

    try {
      await registrar({
        ...formulario,
        dni: parseInt(formulario.dni),
        representante: {
          ...formulario.representante,
          dni: parseInt(formulario.representante.dni)
        }
      })
      navigate('/cuenta-pendiente')
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al registrarse')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">NextVest</h1>
        <p className="text-gray-500 mb-6">Creá tu cuenta</p>

        <div className="flex gap-2 mb-8">
          <div className={`h-1 flex-1 rounded-full ${paso >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`h-1 flex-1 rounded-full ${paso >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {paso === 1 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700 mb-4">Tus datos</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  name="apellido"
                  value={formulario.apellido}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
              <input
                name="dni"
                type="number"
                value={formulario.dni}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
              <input
                name="fecha_nacimiento"
                type="date"
                value={formulario.fecha_nacimiento}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formulario.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                name="contrasenia"
                type="password"
                value={formulario.contrasenia}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              onClick={() => setPaso(2)}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}

        {paso === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm font-medium text-gray-700 mb-4">Datos del representante legal</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  name="nombre"
                  value={formulario.representante.nombre}
                  onChange={handleChangeRepresentante}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  name="apellido"
                  value={formulario.representante.apellido}
                  onChange={handleChangeRepresentante}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
              <input
                name="dni"
                type="number"
                value={formulario.representante.dni}
                onChange={handleChangeRepresentante}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formulario.representante.email}
                onChange={handleChangeRepresentante}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPaso(1)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Atrás
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {cargando ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Registro