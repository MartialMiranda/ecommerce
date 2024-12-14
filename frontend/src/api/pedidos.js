import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:8000/api/pedido";

// Obtener todos los pedidos del usuario
export const obtenerPedidos = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data; // Lista de pedidos
};

// Obtener todas las ventas del vendedor
export const obtenerVentas = async () => {
  const response = await axios.get(`${API_URL}/ventas`);
  return response.data; // Lista de ventas
};

// Crear un nuevo pedido
export const crearPedido = async (pedidoData) => {
  const response = await axios.post(`${API_URL}`, pedidoData);
  return response.data; // Pedido creado
};

// Cambiar el estado del pedido
export const cambiarEstadoPedido = async (pedidoId, estado) => {
  const response = await axios.put(`${API_URL}/${pedidoId}/estado`, { estado });
  return response.data; // Pedido actualizado
};

// Obtener detalles de un pedido
export const obtenerDetallesPedido = async (pedidoId) => {
  const response = await axios.get(`${API_URL}/${pedidoId}`);
  return response.data; // Detalles del pedido
};


// Eliminar un pedido
export const eliminarPedido = async (pedidoId) => {
  const response = await axios.delete(`${API_URL}/${pedidoId}`);
  return response.data; // Confirmación de eliminación
};
