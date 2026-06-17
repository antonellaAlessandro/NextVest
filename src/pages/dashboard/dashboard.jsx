import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerPortafolio } from '../../services/portafolio.service'
import { obtenerSaldo } from '../../services/billetera.service'
import Navbar from '../../components/Navbar'

function Dashboard() {
  const [portafolio, setPortafolio] = useState(null)
  const [saldo, setSaldo] = useState(null)
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function cargarDatos() {
      try {
        const [datosPortafolio, datosSaldo] = await Promise.all([
          obtenerPortafolio(),
          obtenerSaldo()
        ])
        setPortafolio(datosPortafolio)
        setSaldo(datosSaldo.saldo_disponible)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
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
        <h2 className="text-xl font-bold text-gray-800 mb-6">Mi resumen</h2>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Saldo disponible</p>
            <p className="text-2xl font-bold text-gray-800">
              ${saldo?.toLocaleString('es-AR')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Valor del portafolio</p>
            <p className="text-2xl font-bold text-gray-800">
              ${portafolio?.valor_total?.toLocaleString('es-AR')}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Ganancia/Pérdida</p>
            <p className={`text-2xl font-bold ${portafolio?.ganancia_perdida >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              ${portafolio?.ganancia_perdida?.toLocaleString('es-AR')}
            </p>
          </div>
        </div>

        {portafolio?.posiciones?.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-gray-500 mb-4">Todavía no tenés posiciones en tu portafolio.</p>
            <button
              onClick={() => navigate('/mercado')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Ir al mercado
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">Mis posiciones</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="px-6 py-3">Instrumento</th>
                  <th className="px-6 py-3">Unidades</th>
                  <th className="px-6 py-3">Precio actual</th>
                  <th className="px-6 py-3">Variación</th>
                  <th className="px-6 py-3">Valor</th>
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
                    <td className="px-6 py-4 text-sm text-gray-600">${pos.precio_actual?.toLocaleString('es-AR')}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${pos.variacion_pct >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {pos.variacion_pct >= 0 ? '+' : ''}{pos.variacion_pct}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">${pos.valor_actual?.toLocaleString('es-AR')}</td>
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

export default Dashboard