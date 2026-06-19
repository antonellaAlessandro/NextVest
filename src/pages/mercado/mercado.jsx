import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerInstrumentos } from '../../services/mercado.service'
import Navbar from '../../components/Navbar'

const TIPOS = ['Todos', 'FCI', 'Bono', 'Cedear', 'Accion']

function Mercado() {
  const [instrumentos, setInstrumentos] = useState([])
  const [filtroTipo, setFiltroTipo] = useState('Todos')
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function cargarInstrumentos() {
      setCargando(true)
      try {
        const tipo = filtroTipo === 'Todos' ? null : filtroTipo
        const datos = await obtenerInstrumentos(tipo)
        setInstrumentos(datos)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarInstrumentos()
  }, [filtroTipo])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Mercado</h2>

        <div className="flex gap-2 mb-6">
          {TIPOS.map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
          <p className="text-gray-400">Cargando instrumentos...</p>
        ) : instrumentos.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-gray-500">No hay instrumentos disponibles para tu perfil en este filtro.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {instrumentos.map((inst) => (
              <div
                key={inst.id}
                onClick={() => navigate(`/mercado/${inst.id}`)}
                className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-800">{inst.nombre}</p>
                    <p className="text-xs text-gray-400">{inst.ticker} · {inst.tipo}</p>
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    {inst.perfil_minimo}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  ${inst.precio_actual?.toLocaleString('es-AR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Mercado