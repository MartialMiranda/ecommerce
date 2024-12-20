import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  obtenerPedidos,
  crearPedido,
  cambiarEstadoPedido,
  obtenerDetallesPedido,
  eliminarPedido,
  obtenerVentas,
} from "../../api/pedidos";

// Thunks asincrónicos
export const fetchPedidos = createAsyncThunk(
  "pedido/fetchPedidos",
  async (_, { rejectWithValue }) => {
    try {
      const pedidos = await obtenerPedidos();
      return pedidos;
    } catch (error) {
      return rejectWithValue(error.message || "Error al obtener los pedidos");
    }
  }
);

// Nuevo thunk para obtener ventas
export const fetchVentas = createAsyncThunk(
  "pedido/fetchVentas",
  async (_, { rejectWithValue }) => {
    try {
      const ventas = await obtenerVentas();
      return ventas;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al obtener las ventas"
      );
    }
  }
);

export const createPedido = createAsyncThunk(
  "pedido/createPedido",
  async (pedidoData, { rejectWithValue }) => {
    try {
      const pedido = await crearPedido(pedidoData);
      return pedido;
    } catch (error) {
      return rejectWithValue(error.message || "Error al crear el pedido");
    }
  }
);

export const updateEstadoPedido = createAsyncThunk(
  "pedido/updateEstadoPedido",
  async ({ pedidoId, estado }, { rejectWithValue }) => {
    try {
      const pedido = await cambiarEstadoPedido(pedidoId, estado);
      return pedido;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al cambiar el estado del pedido"
      );
    }
  }
);

export const fetchDetallesPedido = createAsyncThunk(
  "pedido/fetchDetallesPedido",
  async (pedidoId, { rejectWithValue }) => {
    try {
      const detalles = await obtenerDetallesPedido(pedidoId);
      return detalles;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al obtener los detalles del pedido"
      );
    }
  }
);

export const deletePedido = createAsyncThunk(
  "pedido/deletePedido",
  async (pedidoId, { rejectWithValue }) => {
    try {
      const response = await eliminarPedido(pedidoId);
      return pedidoId;
    } catch (error) {
      return rejectWithValue(error.message || "Error al eliminar el pedido");
    }
  }
);

// Slice del pedido
const pedidoSlice = createSlice({
  name: "pedido",
  initialState: {
    pedidos: [],
    ventas: [],
    detalles: [],
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener pedidos
      .addCase(fetchPedidos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPedidos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pedidos = action.payload;
      })
      .addCase(fetchPedidos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Obtener ventas
      .addCase(fetchVentas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVentas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ventas = action.payload; // Aquí se guardan las ventas.
      })
      .addCase(fetchVentas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.ventas = []; // Asegúrate de que esté vacío si no hay ventas.
      })
      // Crear pedido
      .addCase(createPedido.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPedido.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pedidos.push(action.payload);
      })
      .addCase(createPedido.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Cambiar estado del pedido
      .addCase(updateEstadoPedido.fulfilled, (state, action) => {
        const pedidoActualizado = action.payload;
        const index = state.pedidos.findIndex(
          (p) => p.id === pedidoActualizado.id
        );
        if (index !== -1) {
          state.pedidos[index] = pedidoActualizado;
        }
      })

      // Obtener detalles del pedido
      .addCase(fetchDetallesPedido.fulfilled, (state, action) => {
        state.detalles = action.payload;
      })

      // Eliminar pedido
      .addCase(deletePedido.fulfilled, (state, action) => {
        const pedidoId = action.payload;
        state.pedidos = state.pedidos.filter(
          (pedido) => pedido.id !== pedidoId
        );
      });
  },
});

export default pedidoSlice.reducer;
