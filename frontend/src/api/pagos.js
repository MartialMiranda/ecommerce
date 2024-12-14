import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = "http://localhost:8000/api/pagos";

// Realizar el pago de un pedido
export const realizarPago = async (datosPago) => {
  const response = await axios.post(`${API_URL}`, datosPago);
  return response.data; // Respuesta del pago
};
