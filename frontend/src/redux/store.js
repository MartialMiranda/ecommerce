import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import direccionEnvioReducer from "./slices/direccionEnvioSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    direccionEnvio: direccionEnvioReducer,
  },
});
