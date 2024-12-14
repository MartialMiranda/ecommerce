import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import direccionEnvioReducer from "./slices/direccionEnvioSlice";
import productoReducer from './slices/productoSlice';
import carritoReducer from './slices/carritoSlice';
import pedidoReducer from "./slices/pedidoSlice";
import pagoReducer from "./slices/pagoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    direccionEnvio: direccionEnvioReducer,
    producto: productoReducer,
    carrito: carritoReducer,
    pedido: pedidoReducer,
    pago: pagoReducer,
  },
});
