// src/api/auth.js
import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    "http://localhost:8000/api/register",
    registrationData
  );
}

export async function onLogin(loginData) {
  const response = await axios.post(
    "http://localhost:8000/api/login",
    loginData
  );
  return response.data;
}

export async function onLogout() {
  return await axios.get("http://localhost:8000/api/logout");
}

export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:8000/api/protected");
}


export async function obtenerUsuarioPorId(id) {
  return await axios.get(`http://localhost:8000/api/usuarios/${id}`);
}
