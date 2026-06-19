import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { obtenerInstrumento } from '../../services/mercado.service'
import { obtenerPortafolio } from '../../services/portafolio.service'
import { obtenerSaldo } from '../../services/billetera.service'
import { ejecutarOrden } from '../../services/portafolio.service'
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Cargando...</p>
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-8">
        <button
          onClick={() => navigate(`/mercado/${id}`)}
          className="text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          ← Volver
        </button>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            {tipo === 'compra' ? 'Comprar' : 'Vender'} {instrumento.nombre}
          </h2>
          <p className="text-sm text-gray-400 mb-6">{instrumento.ticker}</p>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad
            </label>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {tipo === 'venta' && (
              <p className="text-xs text-gray-400 mt-1">
                Disponibles: {unidadesDisponibles} unidades
              </p>
            )}
          </div>

          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Precio unitario</span>
              <span className="text-gray-800 font-medium">
                ${instrumento.precio_actual?.toLocaleString('es-AR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Monto total</span>
              <span className="text-gray-800 font-medium">
                ${montoTotal.toLocaleString('es-AR')}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3">
              <span className="text-gray-500">Saldo actual</span>
              <span className="text-gray-800 font-medium">
                ${saldo.toLocaleString('es-AR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Saldo después</span>
              <span className={`font-medium ${saldoDespues < 0 ? 'text-red-500' : 'text-gray-800'}`}>
                ${saldoDespues.toLocaleString('es-AR')}
              </span>
            </div>
          </div>

          {superaSaldo && (
            <p className="text-sm text-red-500 mb-4">
              El monto supera tu saldo disponible.
            </p>
          )}

          {superaUnidades && (
            <p className="text-sm text-red-500 mb-4">
              No tenés suficientes unidades para vender.
            </p>
          )}

          <button
            onClick={handleConfirmar}
            disabled={procesando || superaSaldo || superaUnidades}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {procesando ? 'Procesando...' : 'Confirmar orden'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmacionOrden