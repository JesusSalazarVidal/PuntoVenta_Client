import axios from "./axios";

export const getVentasRequest = () => axios.get('/obtenerVentas');
export const getVentaRequest = (id) => axios.get(`/obtenerVenta/${id}`);
export const getVentasByFechaRequest = (fecha) => axios.get(`/obtenerVentasByFecha/${fecha}`);
export const createVentaRequest = (venta,id) => axios.post('/crearVenta', venta,id);
export const deleteVentaRequest = (id) => axios.delete(`/eliminarVenta/${id}`)
export const updateVentaRequest = (id, venta) => axios.put(`/actualizarVenta/${id}`,venta);
