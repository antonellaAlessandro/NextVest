import api from './api'

export async function obtenerSaldo() {
  const respuesta = await api.get('/billetera')
  return respuesta.data
}

export async function cargarSaldo(monto) {
  const respuesta = await api.post('/billetera/cargar', { monto })
  return respuesta.data
}