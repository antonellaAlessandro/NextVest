import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { obtenerInstrumento } from '../../services/mercado.service'
import { obtenerPortafolio, ejecutarOrden } from '../../services/portafolio.service'
import { obtenerSaldo } from '../../services/billetera.service'
import Navbar from '../../components/Navbar'

function ConfirmacionOrden() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const tipo = searchParams.get('tipo')
  const navigate = useNavigate()

  const [instrumento, setInstrumento] = useState(null)
  const [saldo, setSaldo] = useState(0)
  const [unidadesDisponibles, setUnidadesDisponibles] = useState(0)
  const [cantidad, setCantidad] = useState(1)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [procesando, setProcesando] = useState(false)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [datosInstrumento, datosPortafolio, datosSaldo] = await Promise.all([
          obtenerInstrumento(id),
          obtenerPortafolio(),
          obtenerSaldo()
        ])
        setInstrumento(datosInstrumento)
        setSaldo(datosSaldo.saldo_disponible)

        const posicion = datosPortafolio.posiciones.find(
          (p) => p.instrumento_id === parseInt(id)
        )
        setUnidadesDisponibles(posicion ? posicion.unidades : 0)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [id])

  if (cargando || !instrumento) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </div>
    )
  }

  const montoTotal = instrumento.precio_actual * cantidad
  const saldoDespues = tipo === 'compra' ? saldo - montoTotal : saldo + montoTotal
  const superaSaldo = tipo === 'compra' && montoTotal > saldo
  const superaUnidades = tipo === 'venta' && cantidad > unidadesDisponibles

  async function handleConfirmar() {
    setProcesando(true)
    setError(null)
    try {
      await ejecutarOrden({
        instrumento_id: parseInt(id),
        tipo: tipo,
        cantidad: cantidad
      })
      navigate('/portafolio')
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al procesar la orden')
    } finally {
      setProcesando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-8">
        <button
          onClick={() => navigate(`/mercado/${id}`)}
          className="text-sm text-slate-400 hover:text-white transition-colors mb-6"
        >
          ← Volver
        </button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
        >
          <h2 className="text-lg font-bold text-white mb-1">
            {tipo === 'compra' ? 'Comprar' : 'Vender'} {instrumento.nombre}
          </h2>
          <p className="text-sm text-slate-500 mb-6">{instrumento.ticker}</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Cantidad
            </label>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            {tipo === 'venta' && (
              <p className="text-xs text-slate-500 mt-1">
                Disponibles: {unidadesDisponibles} unidades
              </p>
            )}
          </div>

          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Precio unitario</span>
              <span className="text-white font-medium">
                ${instrumento.precio_actual?.toLocaleString('es-AR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Monto total</span>
              <span className="text-white font-medium">
                ${montoTotal.toLocaleString('es-AR')}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-3">
              <span className="text-slate-400">Saldo actual</span>
              <span className="text-white font-medium">
                ${saldo.toLocaleString('es-AR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Saldo después</span>
              <span className={`font-medium ${saldoDespues < 0 ? 'text-red-400' : 'text-white'}`}>
                ${saldoDespues.toLocaleString('es-AR')}
              </span>
            </div>
          </div>

          {superaSaldo && (
            <p className="text-sm text-red-400 mb-4">
              El monto supera tu saldo disponible.
            </p>
          )}

          {superaUnidades && (
            <p className="text-sm text-red-400 mb-4">
              No tenés suficientes unidades para vender.
            </p>
          )}

          <button
            onClick={handleConfirmar}
            disabled={procesando || superaSaldo || superaUnidades}
            className="w-full bg-cyan-500 text-slate-950 py-3 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors disabled:opacity-50"
          >
            {procesando ? 'Procesando...' : 'Confirmar orden'}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ConfirmacionOrden