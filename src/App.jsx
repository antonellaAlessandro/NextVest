import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Registro from './pages/Auth/Registro'
import CuentaPendiente from './pages/Auth/CuentaPendiente'
import Dashboard from './pages/Dashboard/Dashboard'
import Mercado from './pages/Mercado/Mercado'
import DetalleInstrumento from './pages/Mercado/DetalleInstrumento'
import ConfirmacionOrden from './pages/Mercado/ConfirmacionOrden'
import Portafolio from './pages/Portafolio/Portafolio'
import Historial from './pages/Portafolio/Historial'
import Billetera from './pages/Billetera/Billetera'
import MiCuenta from './pages/MiCuenta/MiCuenta'
import PerfilRiesgo from './pages/MiCuenta/PerfilRiesgo'
import GestionUsuarios from './pages/Admin/GestionUsuarios'
import GestionInstrumentos from './pages/Admin/GestionInstrumentos'
import Configuracion from './pages/Admin/Configuracion'
import Educacion from './pages/Publica/Educacion'
import QuienesSomos from './pages/Publica/QuienesSomos'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/Admin/AdminLogin'
import NotFound from './pages/NotFound'
import Inicio from './pages/Inicio'
import DetalleUsuario from './pages/Admin/DetalleUsuario'

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/cuenta-pendiente" element={<CuentaPendiente />} />
      <Route path="/educacion" element={<Educacion />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Rutas privadas menor */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/mercado" element={<ProtectedRoute><Mercado /></ProtectedRoute>} />
      <Route path="/mercado/:id" element={<ProtectedRoute><DetalleInstrumento /></ProtectedRoute>} />
      <Route path="/mercado/:id/orden" element={<ProtectedRoute><ConfirmacionOrden /></ProtectedRoute>} />
      <Route path="/portafolio" element={<ProtectedRoute><Portafolio /></ProtectedRoute>} />
      <Route path="/historial" element={<ProtectedRoute><Historial /></ProtectedRoute>} />
      <Route path="/billetera" element={<ProtectedRoute><Billetera /></ProtectedRoute>} />
      <Route path="/mi-cuenta" element={<ProtectedRoute><MiCuenta /></ProtectedRoute>} />
      <Route path="/perfil-riesgo" element={<ProtectedRoute><PerfilRiesgo /></ProtectedRoute>} />

      {/* Rutas privadas admin */}
      <Route path="/admin/usuarios" element={<ProtectedRoute admin><GestionUsuarios /></ProtectedRoute>} />
      <Route path="/admin/instrumentos" element={<ProtectedRoute admin><GestionInstrumentos /></ProtectedRoute>} />
      <Route path="/admin/configuracion" element={<ProtectedRoute admin><Configuracion /></ProtectedRoute>} />
      <Route path="/admin/usuarios/:id" element={<ProtectedRoute admin><DetalleUsuario /></ProtectedRoute>} />

      {/* Redirigir raíz al login */}
      <Route path="/" element={<Inicio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App