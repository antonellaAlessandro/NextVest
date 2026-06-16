import api from './api'

export async function obtenerInstrumentos(tipo = null) {
  const url = tipo ? `/mercado?tipo=${tipo}` : '/mercado'
  const respuesta = await api.get(url)
  return respuesta.data
}

export async function obtenerInstrumento(id) {
  const respuesta = await api.get(`/mercado/${id}`)
  return respuesta.data
}