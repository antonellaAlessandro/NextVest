import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, admin = false }) {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to="/login" />
  }

  if (admin && usuario.rol !== 'admin') {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default ProtectedRoute