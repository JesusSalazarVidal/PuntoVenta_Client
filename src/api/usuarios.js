import axios from './axios'

export const getUsuariosRequest = async () => axios.get('/obtenerUsuarios')
export const crearUsuarioRequest = async (usuario) => axios.post('/crearUsuario', usuario)
export const updateUsuarioRequest = async (id, usuario) => axios.put(`/actualizarUsuario/${id}`, usuario)
export const deleteUsuarioRequest = async (id) => axios.delete(`/eliminarUsuario/${id}`)
export const getUsuarioRequest = async (id) => axios.get(`/obtenerUsuario/${id}`)