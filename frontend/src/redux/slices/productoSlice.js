import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductos,
  fetchProductoById,
  addProducto,
  updateProducto,
  deleteProducto,
  fetchMisProductos,
} from "../../api/productos";

export const getProductos = createAsyncThunk(
  "producto/getProductos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProductos();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Estado inicial
const initialState = {
  productos: [], // Lista general de productos
  misProductos: [], // Lista de productos del usuario
  loading: false,
  error: null,
};

export const createProducto = createAsyncThunk(
  "producto/createProducto",
  async ({ productoData, token }, { rejectWithValue }) => {
    try {
      const response = await addProducto(productoData, token);
      return response.data.producto; // Retornar solo el producto creado
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error al crear el producto"
      );
    }
  }
);

// Thunk para obtener mis productos
export const getMisProductos = createAsyncThunk(
  "producto/getMisProductos",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const response = await fetchMisProductos(token);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error al obtener mis productos"
      );
    }
  }
);
export const getProductoById = createAsyncThunk(
  "producto/getProductoById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchProductoById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Actualizar un producto por ID
export const updateProductoById = createAsyncThunk(
  "producto/updateProductoById",
  async ({ id, productoData }, { rejectWithValue }) => {
    try {
      const response = await updateProducto(id, productoData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProductoById = createAsyncThunk(
  "producto/deleteProductoById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteProducto(id);
      return { id }; // Solo devolvemos el ID eliminado
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productoSlice = createSlice({
  name: "producto",
  initialState,
  reducers: {
    productos: [],
    producto: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      })
      .addCase(getProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.productos.push(action.payload);
      })
      .addCase(createProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMisProductos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMisProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.misProductos = action.payload;
      })
      .addCase(getMisProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.misProductos = [];
      })
      // Editar producto
      .addCase(updateProductoById.fulfilled, (state, action) => {
        const index = state.productos.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.productos[index] = action.payload;
        }
      })
      // Obtener producto por ID
      .addCase(getProductoById.pending, (state) => {
        state.loadingProducto = true;
        state.error = null;
      })
      .addCase(getProductoById.fulfilled, (state, action) => {
        state.loadingProducto = false;
        state.producto = action.payload;
      })
      .addCase(getProductoById.rejected, (state, action) => {
        state.loadingProducto = false;
        state.error = action.payload;
      })
      // Eliminar producto
      .addCase(deleteProductoById.fulfilled, (state, action) => {
        state.productos = state.productos.filter(
          (p) => p.id !== action.payload.id
        );
      });
  },
});

export default productoSlice.reducer;
