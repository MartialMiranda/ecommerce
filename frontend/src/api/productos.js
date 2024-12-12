import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8000/api";

export const fetchProductos = async () => {
  return await axios.get(`${API_BASE_URL}/productos`);
};

export const fetchProductoById = async (id) => {
  return await axios.get(`${API_BASE_URL}/productos/${id}`);
};

export const addProducto = async (productoData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  };
  return await axios.post(`${API_BASE_URL}/productos`, productoData, config);
};

// Actualizar un producto por ID
export async function updateProducto(id, productoData) {
  return await axios.put(`${API_BASE_URL}/productos/${id}`, productoData);
}


export const deleteProducto = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return await axios.delete(`${API_BASE_URL}/productos/${id}`, config);
};
// api/productos.js
export const fetchMisProductos = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return await axios.get(`${API_BASE_URL}/productos/mis-productos`, config);
};
export const fetchCategorias = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  return await axios.get(`${API_BASE_URL}/productos/categorias`, config);
};
