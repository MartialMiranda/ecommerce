import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import direccionEnvioReducer from "./slices/direccionEnvioSlice";
import productoReducer from './slices/productoSlice';
import carritoReducer from './slices/carritoSlice';
import pedidoReducer from "./slices/pedidoSlice";
import pagoReducer from "./slices/pagoSlice";
import categoriaReducer from './slices/categoriaSlice';
import favoritosReducer from './slices/favoritoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    direccionEnvio: direccionEnvioReducer,
    producto: productoReducer,
    carrito: carritoReducer,
    pedido: pedidoReducer,
    pago: pagoReducer,
    categoria: categoriaReducer,
    favoritos: favoritosReducer,
  },
});
