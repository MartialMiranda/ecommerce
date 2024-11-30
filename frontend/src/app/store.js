import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/Counter';
import authReducer from '../redux/slices/authSlice';
import direccionEnvioReducer from '../redux/slices/direccionEnvioSlice';

export const store = configureStore({
  reducer: {
    Counter: counterReducer,
    auth: authReducer,
    direccionEnvio: direccionEnvioReducer, // Asegúrate de que el nombre coincida
  },
});