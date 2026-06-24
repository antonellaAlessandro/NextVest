import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { autorizarCuenta } from '../../services/auth.service'
import FondoLR from '../../components/FondoLR'

function Autorizar() {
  const { uuid } = useParams()
  const [searchParams] = useSearchParams()
  const accion = searchParams.get('accion')

  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function procesar() {
      try {
        const datos = await autorizarCuenta(uuid, accion)
        setResultado(datos.mensaje)
      } catch (err) {
        setError(err.response?.data?.detail || 'Error al procesar la autorización')
      } finally {
        setCargando(false)
      }
    }
    procesar()
  }, [uuid, accion])

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative">
      <FondoLR />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl w-full max-w-md text-center relative z-10"
      >
        <p className="text-2xl font-bold tracking-tight mb-6">
          Next<span className="text-cyan-400">Vest</span>
        </p>

        {cargando && (
          <p className="text-slate-400">Procesando autorización...</p>
        )}

        {!cargando && resultado && (
          <>
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-xl font-bold mb-2">
              {accion === 'aprobar' ? 'Cuenta autorizada' : 'Cuenta rechazada'}
            </h1>
            <p className="text-slate-400 text-sm">{resultado}</p>
          </>
        )}

        {!cargando && error && (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✕</span>
            </div>
            <h1 className="text-xl font-bold mb-2">No se pudo procesar</h1>
            <p className="text-slate-400 text-sm">{error}</p>
          </>
        )}

        <Link to="/" className="block text-sm text-cyan-400 hover:underline mt-8">
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  )
}

export default Autorizar