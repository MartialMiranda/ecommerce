// src/api/direcciones.js
import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8000/api";

export async function fetchDirecciones() {
  return await axios.get(`${API_BASE_URL}/direcciones`);
}
export const fetchDireccionById = (id) => {
  return axios.get(`${API_BASE_URL}/direcciones/${id}`);
};
export async function addDireccion(direccionData) {
  return await axios.post(`${API_BASE_URL}/direcciones`, direccionData);
}

export async function updateDireccion(id, direccionData) {
  return await axios.put(`${API_BASE_URL}/direcciones/${id}`, direccionData);
}

export async function deleteDireccion(id) {
  return await axios.delete(`${API_BASE_URL}/direcciones/${id}`);
}
