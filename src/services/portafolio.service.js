import api from './api'

export async function obtenerPortafolio() {
  const respuesta = await api.get('/portafolio')
  return respuesta.data
}

export async function obtenerHistorial() {
  const respuesta = await api.get('/ordenes')
  return respuesta.data
}

export async function ejecutarOrden(datos) {
  const respuesta = await api.post('/ordenes', datos)
  return respuesta.data
}