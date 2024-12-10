import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:8000/api/carrito";

export const obtenerCarrito = async () => {
  const response = await axios.get(API_URL);
  return response.data.productos; // Retorna solo los productos
};

export const agregarProducto = async (productoId, cantidad) => {
  const response = await axios.post(`${API_URL}/agregar`, {
    productoId,
    cantidad,
  });
  return response.data;
};

export const eliminarProducto = async (productoId) => {
  const response = await axios.delete(`${API_URL}/eliminar`, {
    data: { productoId },
  });
  return response.data;
};
