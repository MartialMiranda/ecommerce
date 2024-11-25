import axios from 'axios';

const API_URL = 'http://localhost:8000/api/productos';

export const obtenerProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};
