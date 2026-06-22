import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function TarjetaInstrumento({ instrumento }) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate(`/mercado/${instrumento.id}`)}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 cursor-pointer hover:border-cyan-500/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-medium text-white">{instrumento.nombre}</p>
          <p className="text-xs text-slate-500">{instrumento.ticker} · {instrumento.tipo}</p>
        </div>
        <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full">
          {instrumento.perfil_minimo}
        </span>
      </div>
      <p className="text-lg font-bold text-white">
        ${instrumento.precio_actual?.toLocaleString('es-AR')}
      </p>
    </motion.div>
  )
}

export default TarjetaInstrumento