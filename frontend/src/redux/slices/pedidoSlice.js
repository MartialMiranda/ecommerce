import { createSlice } from "@reduxjs/toolkit";

// Estado inicial de los pedidos
const initialState = {
  pedidos: [], // Lista de pedidos realizados
  status: "idle", // Estado de las operaciones (idle, loading, success, failed)
  error: null, // Manejo de errores
};

const pedidoSlice = createSlice({
  name: "pedido",
  initialState,
  reducers: {
    addPedido: (state, action) => {
      state.pedidos.push(action.payload);
    },
    setPedidosStatus: (state, action) => {
      state.status = action.payload;
    },
    setPedidosError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addPedido, setPedidosStatus, setPedidosError } =
  pedidoSlice.actions;

export default pedidoSlice.reducer;
