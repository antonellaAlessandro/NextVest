import { useNavigate } from 'react-router-dom'

function TarjetaInstrumento({ instrumento }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/mercado/${instrumento.id}`)}
      className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-medium text-gray-800">{instrumento.nombre}</p>
          <p className="text-xs text-gray-400">{instrumento.ticker} · {instrumento.tipo}</p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          {instrumento.perfil_minimo}
        </span>
      </div>
      <p className="text-lg font-bold text-gray-800">
        ${instrumento.precio_actual?.toLocaleString('es-AR')}
      </p>
    </div>
  )
}

export default TarjetaInstrumento