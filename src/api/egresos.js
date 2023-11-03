import axios from './axios'

export const getEgresosRequest = async () => axios.get('/obtenerEgresos')
export const crearEgresoRequest = async (egreso) => axios.post('/crearEgreso', egreso)
export const updateEgresoRequest = async (id, egreso) => axios.put(`/actualizarEgreso/${id}`, egreso)
export const deleteEgresoRequest = async (id) => axios.delete(`/eliminarEgreso/${id}`)
export const getEgresoRequest = async (id) => axios.get(`/obtenerEgreso/${id}`)
export const getEgresosByFechaRequest = async (fecha) => axios.get(`/obtenerEgresosByFecha/${fecha}`)