// api/favoritos.js
import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8000/api";

export async function fetchFavoritos() {
  return await axios.get(`${API_BASE_URL}/favoritos`);
}

export async function addFavorito(productoId) {
  return await axios.post(`${API_BASE_URL}/favoritos`, { productoId });
}

export async function removeFavorito(productoId) {
  return await axios.delete(`${API_BASE_URL}/favoritos/${productoId}`);
}