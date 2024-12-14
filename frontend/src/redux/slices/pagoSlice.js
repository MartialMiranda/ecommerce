import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { realizarPago } from "../../api/pagos";

// Thunk para realizar el pago
export const realizarPagoThunk = createAsyncThunk(
  "pago/realizarPago",
  async ( datosPago , { rejectWithValue }) => {
    try {
      const pago = await realizarPago(datosPago);
      return pago; // Respuesta del pago
    } catch (error) {
      return rejectWithValue(error.message || "Error al realizar el pago");
    }
  }
);

// Slice de pagos
const pagoSlice = createSlice({
  name: "pago",
  initialState: {
    pago: null,
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(realizarPagoThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(realizarPagoThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pago = action.payload;
      })
      .addCase(realizarPagoThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default pagoSlice.reducer;
