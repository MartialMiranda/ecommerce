import axios from "axios";
axios.defaults.withCredentials = true;

// Crear un nuevo pedido
export async function createOrderApi(orderData) {
  return await axios.post("http://localhost:8000/api/pedidos", orderData);
}

// Obtener pedidos
export async function fetchOrdersApi() {
  const response = await axios.get("http://localhost:8000/api/pedidos");
  return response.data;
}
