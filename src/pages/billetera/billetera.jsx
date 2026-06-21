import { useState, useEffect } from 'react'
import { obtenerSaldo, cargarSaldo } from '../../services/billetera.service'
import { obtenerHistorial } from '../../services/portafolio.service'
import Navbar from '../../components/Navbar'

function Billetera() {
  const [saldo, setSaldo] = useState(0)
  const [historial, setHistorial] = useState([])
  const [monto, setMonto] = useState('')
  const [mensaje, setMensaje] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [procesando, setProcesando] = useState(false)

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    try {
      const [datosSaldo, datosHistorial] = await Promise.all([
        obtenerSaldo(),
        obtenerHistorial()
      ])
      setSaldo(datosSaldo.saldo_disponible)
      setHistorial(datosHistorial)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  async function handleCargarSaldo(e) {
    e.preventDefault()
    setProcesando(true)
    setError(null)
    setMensaje(null)

    try {
      const resultado = await cargarSaldo(parseFloat(monto))
      setSaldo(resultado.saldo_disponible)
      setMensaje(`Se cargaron $${parseFloat(monto).toLocaleString('es-AR')} a tu billetera.`)
      setMonto('')
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al cargar saldo')
    } finally {
      setProcesando(false)
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

      <div className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Billetera</h2>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-1">Saldo disponible</p>
          <p className="text-3xl font-bold text-gray-800 mb-6">
            ${saldo?.toLocaleString('es-AR')}
          </p>

          {mensaje && (
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {mensaje}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleCargarSaldo} className="flex gap-3">
            <input
              type="number"
              min="1"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Monto a cargar"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={procesando}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {procesando ? 'Cargando...' : 'Cargar saldo'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-800">Movimientos recientes</h3>
          </div>

          {historial.length === 0 ? (
            <p className="text-gray-500 text-sm px-6 py-8 text-center">
              No hay movimientos todavía.
            </p>
          ) : (
            <div className="divide-y divide-gray-50">
              {historial.slice(0, 10).map((orden) => (
                <div key={orden.id} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-800 capitalize">{orden.tipo}</p>
                    <p className="text-xs text-gray-400">{orden.fecha} {orden.hora}</p>
                  </div>
                  <p className={`text-sm font-medium ${orden.tipo === 'compra' ? 'text-red-500' : 'text-green-600'}`}>
                    {orden.tipo === 'compra' ? '-' : '+'}${(orden.precio_unitario * orden.cantidad).toLocaleString('es-AR')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Billetera