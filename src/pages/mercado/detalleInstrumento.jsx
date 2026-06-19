import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerInstrumento } from '../../services/mercado.service'
import { obtenerPortafolio } from '../../services/portafolio.service'
import Navbar from '../../components/Navbar'

function DetalleInstrumento() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [instrumento, setInstrumento] = useState(null)
  const [tieneUnidades, setTieneUnidades] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [datosInstrumento, datosPortafolio] = await Promise.all([
          obtenerInstrumento(id),
          obtenerPortafolio()
        ])
        setInstrumento(datosInstrumento)
        const posicion = datosPortafolio.posiciones.find(
          (p) => p.instrumento_id === parseInt(id)
        )
        setTieneUnidades(!!posicion)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [id])

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Cargando...</p>
      </div>
    )
  }

  if (!instrumento) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Instrumento no encontrado</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/mercado')}
          className="text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          ← Volver al mercado
        </button>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{instrumento.nombre}</h2>
              <p className="text-sm text-gray-400">{instrumento.ticker} · {instrumento.tipo}</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
              Perfil {instrumento.perfil_minimo}
            </span>
          </div>

          <p className="text-3xl font-bold text-gray-800 mb-6">
            ${instrumento.precio_actual?.toLocaleString('es-AR')}
          </p>

          <p className="text-sm text-gray-600 mb-8">
            {instrumento.descripcion}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/mercado/${id}/orden?tipo=compra`)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Comprar
            </button>
            {tieneUnidades && (
              <button
                onClick={() => navigate(`/mercado/${id}/orden?tipo=venta`)}
                className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Vender
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleInstrumento