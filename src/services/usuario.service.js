import api from './api'

export async function obtenerPerfil() {
  const respuesta = await api.get('/usuarios/me')
  return respuesta.data
}

export async function actualizarPerfil(datos) {
  const respuesta = await api.patch('/usuarios/me', datos)
  return respuesta.data
}

export async function cambiarContrasenia(datos) {
  const respuesta = await api.patch('/usuarios/me/contrasenia', datos)
  return respuesta.data
}

export async function guardarPerfilRiesgo(respuestas) {
  const respuesta = await api.post('/usuarios/me/perfil-riesgo', { respuestas })
  return respuesta.data
}