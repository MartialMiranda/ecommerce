import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import direccionEnvioReducer from "./slices/direccionEnvioSlice";
import productoReducer from './slices/productoSlice';
import carritoReducer from './slices/carritoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    direccionEnvio: direccionEnvioReducer,
    producto: productoReducer,
    carrito: carritoReducer,
  },
});
