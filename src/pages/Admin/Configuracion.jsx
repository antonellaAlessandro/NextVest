import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../services/api'
import NavbarAdmin from '../../components/NavbarAdmin'

function Configuracion() {
  const [config, setConfig] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarConfig() {
      try {
        const respuesta = await api.get('/admin/configuracion')
        setConfig(respuesta.data)
      } catch (err) {
        console.error(err)
      } finally {
        setCargando(false)
      }
    }
    cargarConfig()
  }, [])

  if (cargando) {
    return <p className="text-slate-500 p-8 bg-black min-h-screen">Cargando...</p>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarAdmin />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold mb-6"
        >
          Configuración del sistema
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6"
        >
          <div className="flex justify-between items-center pb-6 border-b border-slate-800">
            <div>
              <p className="font-medium text-white">Vencimiento del token parental</p>
              <p className="text-sm text-slate-400">Horas que tiene el representante para autorizar la cuenta</p>
            </div>
            <p className="text-lg font-bold text-cyan-400">
              {config.token_parental_expire_hours}hs
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-white">Resumen semanal</p>
              <p className="text-sm text-slate-400">Envío automático al representante legal</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              config.resumen_semanal_activo ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500'
            }`}>
              {config.resumen_semanal_activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </motion.div>

        <p className="text-xs text-slate-500 mt-4">
          Estos valores se configuran desde el archivo .env del servidor.
        </p>
      </div>
    </div>
  )
}

export default Configuracion