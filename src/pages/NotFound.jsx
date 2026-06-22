import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FondoLR from '../components/FondoLR'

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative">
      <FondoLR />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <p className="text-7xl font-bold text-cyan-400 mb-4">404</p>
        <p className="text-slate-400 mb-8">Esta página no existe.</p>
        <Link
          to="/"
          className="bg-cyan-500 text-slate-950 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-cyan-400 transition-colors inline-block"
        >
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound