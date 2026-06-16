import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const token = localStorage.getItem('token')
    const rol = localStorage.getItem('rol')
    return token ? { token, rol } : null
  })

  function iniciarSesion(token, rol) {
    localStorage.setItem('token', token)
    localStorage.setItem('rol', rol)
    setUsuario({ token, rol })
  }

  function cerrarSesion() {
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}