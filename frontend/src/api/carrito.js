// api/carrito.js

import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8000/api";

export const fetchCarrito = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.get(`${API_BASE_URL}/carrito`, config);
};

export const addProductoAlCarrito = async (productoId, cantidad, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(
    `${API_BASE_URL}/carrito`,
    { productoId, cantidad },
    config
  );
};

export const updateProductoCarrito = async (productoId, cantidad, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.put(
    `${API_BASE_URL}/carrito/${productoId}`,
    { cantidad },
    config
  );
};

export const removeProductoDelCarrito = async (productoId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.delete(`${API_BASE_URL}/carrito/${productoId}`, config);
};
