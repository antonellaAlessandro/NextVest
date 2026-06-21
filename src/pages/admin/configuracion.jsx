import { useState, useEffect } from 'react'
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
    return <p className="text-gray-400 p-8">Cargando...</p>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Configuración del sistema</h2>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-6 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-800">Vencimiento del token parental</p>
              <p className="text-sm text-gray-500">Horas que tiene el representante para autorizar la cuenta</p>
            </div>
            <p className="text-lg font-bold text-blue-600">
              {config.token_parental_expire_hours}hs
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">Resumen semanal</p>
              <p className="text-sm text-gray-500">Envío automático al representante legal</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              config.resumen_semanal_activo ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {config.resumen_semanal_activo ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Estos valores se configuran desde el archivo .env del servidor.
        </p>
      </div>
    </div>
  )
}

export default Configuracion