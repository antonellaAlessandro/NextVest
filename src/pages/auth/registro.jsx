import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { registrar } from '../../services/auth.service'
import FondoLR from '../../components/FondoLR'

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

  const inputClass = "w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5"

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative py-8">
      <FondoLR />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl w-full max-w-md relative z-10"
      >
        <Link to="/" className="text-2xl font-bold tracking-tight mb-1 inline-block">
          Next<span className="text-cyan-400">Vest</span>
        </Link>
        <p className="text-slate-400 mb-6">Creá tu cuenta</p>

        <div className="flex gap-2 mb-8">
          <div className={`h-1 flex-1 rounded-full transition-colors ${paso >= 1 ? 'bg-cyan-500' : 'bg-slate-800'}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors ${paso >= 2 ? 'bg-cyan-500' : 'bg-slate-800'}`} />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {paso === 1 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-300 mb-2">Tus datos</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Apellido</label>
                <input
                  name="apellido"
                  value={formulario.apellido}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>DNI</label>
              <input
                name="dni"
                type="number"
                value={formulario.dni}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Fecha de nacimiento</label>
              <input
                name="fecha_nacimiento"
                type="date"
                value={formulario.fecha_nacimiento}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                name="email"
                type="email"
                value={formulario.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Contraseña</label>
              <input
                name="contrasenia"
                type="password"
                value={formulario.contrasenia}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <button
              onClick={() => setPaso(2)}
              className="w-full bg-cyan-500 text-slate-950 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}

        {paso === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm font-medium text-slate-300 mb-2">Datos del representante legal</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  name="nombre"
                  value={formulario.representante.nombre}
                  onChange={handleChangeRepresentante}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Apellido</label>
                <input
                  name="apellido"
                  value={formulario.representante.apellido}
                  onChange={handleChangeRepresentante}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>DNI</label>
              <input
                name="dni"
                type="number"
                value={formulario.representante.dni}
                onChange={handleChangeRepresentante}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                name="email"
                type="email"
                value={formulario.representante.email}
                onChange={handleChangeRepresentante}
                className={inputClass}
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPaso(1)}
                className="flex-1 border border-slate-700 text-slate-300 py-2.5 rounded-lg text-sm font-medium hover:border-slate-500 hover:text-white transition-colors"
              >
                Atrás
              </button>
              <button
                type="submit"
                disabled={cargando}
                className="flex-1 bg-cyan-500 text-slate-950 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors disabled:opacity-50"
              >
                {cargando ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-slate-400 mt-6">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-cyan-400 font-medium hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Registro