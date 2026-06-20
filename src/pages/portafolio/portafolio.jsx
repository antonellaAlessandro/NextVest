import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerPortafolio } from '../../services/portafolio.service'
import Navbar from '../../components/Navbar'

function Portafolio() {
  const [portafolio, setPortafolio] = useState(null)
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function cargarPortafolio() {
      try {
        const datos = await obtenerPortafolio()
        setPortafolio(datos)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarPortafolio()
  }, [])

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

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Mi portafolio</h2>
          <button
            onClick={() => navigate('/historial')}
            className="text-sm text-blue-600 hover:underline"
          >
            Ver historial →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Valor total</p>
            <p className="text-2xl font-bold text-gray-800">
              ${portafolio?.valor_total?.toLocaleString('es-AR')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Ganancia/Pérdida</p>
            <p className={`text-2xl font-bold ${portafolio?.ganancia_perdida >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              ${portafolio?.ganancia_perdida?.toLocaleString('es-AR')}
              <span className="text-sm font-normal ml-2">
                ({portafolio?.ganancia_pct >= 0 ? '+' : ''}{portafolio?.ganancia_pct}%)
              </span>
            </p>
          </div>
        </div>

        {portafolio?.posiciones?.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-gray-500 mb-4">Todavía no tenés posiciones.</p>
            <button
              onClick={() => navigate('/mercado')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Ir al mercado
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="px-6 py-3">Instrumento</th>
                  <th className="px-6 py-3">Unidades</th>
                  <th className="px-6 py-3">Precio compra</th>
                  <th className="px-6 py-3">Precio actual</th>
                  <th className="px-6 py-3">Variación</th>
                  <th className="px-6 py-3">Valor</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {portafolio?.posiciones?.map((pos) => (
                  <tr key={pos.instrumento_id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 text-sm">{pos.nombre}</p>
                      <p className="text-xs text-gray-400">{pos.ticker}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pos.unidades}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${pos.precio_prom_compra?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${pos.precio_actual?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${pos.variacion_pct >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {pos.variacion_pct >= 0 ? '+' : ''}{pos.variacion_pct}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${pos.valor_actual?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/mercado/${pos.instrumento_id}`)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Vender
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Portafolio