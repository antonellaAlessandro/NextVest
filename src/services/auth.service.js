import api from './api'

export async function registrar(datos) {
  const respuesta = await api.post('/auth/registro', datos)
  return respuesta.data
}

export async function login(email, contrasenia) {
  const respuesta = await api.post('/auth/login', { email, contrasenia })
  return respuesta.data
}

export async function reenviarToken(email) {
  const respuesta = await api.post(`/auth/reenviar-token?email=${email}`)
  return respuesta.data
}