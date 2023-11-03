import axios from './axios'

export const getProductosRequest = () => axios.get('/obtenerProductos');
export const getProductoRequest = (id) => axios.get(`/obtenerProducto/${id}`);
export const createProductoRequest = (producto) => axios.post('/crearProducto', producto);
export const deleteProductoRequest = (id) => axios.delete(`/eliminarProducto/${id}`)
export const updateProductoRequest = (id, producto) => axios.put(`/actualizarProducto/${id}`,producto);
export const getProductoByTipoRequest = (tipo) => axios.get(`/obtenerProductosByTipo/${tipo}`);
export const getProductoByCategoriaRequest = (categoria) => axios.get(`/obtenerProductosByCategoria/${categoria}`);

//Categorias 
export const getCategoriasRequest = () => axios.get('/obtenerCategorias');
export const createCategoriaRequest = (categoria) => axios.post('/crearCategoria',categoria);
export const getCategoriasByTipoRequest = (tipo) => axios.get(`/obtenerCategoriasByTipo/${tipo}`);

//Tipo
export const getTiposRequest = () => axios.get('/obtenerTipos');
export const createTipoRequest = (tipo) => axios.post('/crearTipo', tipo);