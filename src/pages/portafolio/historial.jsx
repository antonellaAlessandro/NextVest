import { useState, useEffect } from 'react'
import { obtenerHistorial } from '../../services/portafolio.service'
import Navbar from '../../components/Navbar'

function Historial() {
  const [ordenes, setOrdenes] = useState([])
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarHistorial() {
      try {
        const datos = await obtenerHistorial()
        setOrdenes(datos)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarHistorial()
  }, [])

  const ordenesFiltradas = ordenes.filter((orden) => {
    if (filtroTipo === 'todos') return true
    return orden.tipo === filtroTipo
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Historial de operaciones</h2>

        <div className="flex gap-2 mb-6">
          {['todos', 'compra', 'venta'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filtroTipo === tipo
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>

        {cargando ? (
          <p className="text-gray-400">Cargando...</p>
        ) : ordenesFiltradas.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-gray-500">No hay operaciones para mostrar.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Unidades</th>
                  <th className="px-6 py-3">Precio</th>
                  <th className="px-6 py-3">Monto</th>
                </tr>
              </thead>
              <tbody>
                {ordenesFiltradas.map((orden) => (
                  <tr key={orden.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {orden.fecha} {orden.hora}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        orden.tipo === 'compra'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}>
                        {orden.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{orden.cantidad}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${orden.precio_unitario?.toLocaleString('es-AR')}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ${(orden.precio_unitario * orden.cantidad).toLocaleString('es-AR')}
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

export default Historial