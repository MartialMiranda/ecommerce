import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8000/api/categorias";

export const fetchCategorias = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/obtenerCategorias`);
    console.log("Categorías obtenidas:", response.data); // Verifica la respuesta aquí
    return response;
  } catch (error) {
    console.error("Error en la obtención de categorías:", error);
    throw error;
  }
};


export const fetchCategoriaById = async (id) => {
  return await axios.get(`${API_BASE_URL}/obtenerCategorias/${id}`);
};
