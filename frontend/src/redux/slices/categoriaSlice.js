import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategorias,
  fetchCategoriaById,
} from "../../api/categorias";

// Thunks
export const getCategorias = createAsyncThunk(
    "categoria/getCategorias",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetchCategorias();
        console.log("Categorías obtenidas:", response.data); // Verifica la respuesta
        return response.data.data;  // Asegúrate de acceder a response.data.data, que es el array
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  

export const getCategoriaById = createAsyncThunk(
  "categoria/getCategoriaById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchCategoriaById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Estado inicial
const initialState = {
  categorias: [],
  categoria: null,
  loading: false,
  error: null,
};

const categoriaSlice = createSlice({
  name: "categoria",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener todas las categorías
      .addCase(getCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(getCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Obtener una categoría por ID
      .addCase(getCategoriaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoriaById.fulfilled, (state, action) => {
        state.loading = false;
        state.categoria = action.payload;
      })
      .addCase(getCategoriaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default categoriaSlice.reducer;
