// src/redux/slices/direccionEnvioSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDirecciones, fetchDireccionById,  addDireccion, updateDireccion, deleteDireccion } from "../../api/direcciones";

export const getDirecciones = createAsyncThunk(
  "direccionEnvio/getDirecciones",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchDirecciones();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Acción para obtener una dirección por ID
export const getDireccionById = createAsyncThunk(
  "direccionEnvio/getDireccionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchDireccionById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createDireccion = createAsyncThunk(
  "direccionEnvio/createDireccion",
  async (direccionData, { rejectWithValue }) => {
    try {
      const response = await addDireccion(direccionData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateDireccionById = createAsyncThunk(
  "direccionEnvio/updateDireccionById",
  async ({ id, direccionData }, { rejectWithValue }) => {
    try {
      const response = await updateDireccion(id, direccionData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteDireccionById = createAsyncThunk(
  "direccionEnvio/deleteDireccionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteDireccion(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const direccionEnvioSlice = createSlice({
  name: "direccionEnvio",
  initialState: {
    direcciones: [],
    direccion: null,
    loadingDirecciones: false,
    loadingDireccion: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDirecciones.pending, (state) => {
        state.loadingDirecciones = true;
        state.error = null;
      })
      .addCase(getDirecciones.fulfilled, (state, action) => {
        state.loadingDirecciones = false;
        state.direcciones = action.payload;
      })
      .addCase(getDirecciones.rejected, (state, action) => {
        state.loadingDirecciones = false;
        state.error = action.payload;
      })
      .addCase(createDireccion.fulfilled, (state, action) => {
        state.direcciones.push(action.payload);
      })
      .addCase(updateDireccionById.fulfilled, (state, action) => {
        const index = state.direcciones.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.direcciones[index] = action.payload;
        }
      })
      .addCase(getDireccionById.pending, (state) => {
        state.loadingDireccion = true;
        state.error = null;
      })
      .addCase(getDireccionById.fulfilled, (state, action) => {
        state.loadingDireccion = false;
        state.direccion = action.payload;
      })
      .addCase(getDireccionById.rejected, (state, action) => {
        state.loadingDireccion = false;
        state.error = action.payload;
      })
      .addCase(deleteDireccionById.fulfilled, (state, action) => {
        if (action.payload?.id) {
          state.direcciones = state.direcciones.filter((d) => d.id !== action.payload.id);
        }
      });
  },
});


export default direccionEnvioSlice.reducer;
