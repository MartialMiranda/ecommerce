import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { agregarProducto, eliminarProducto, obtenerCarrito } from "../../api/carrito";


export const fetchCarrito = createAsyncThunk('carrito/fetchCarrito', async () => {
  return await obtenerCarrito();
});

export const addProducto = createAsyncThunk('carrito/addProducto', async ({ productoId, cantidad }) => {
  return await agregarProducto(productoId, cantidad);
});

export const removeProducto = createAsyncThunk('carrito/removeProducto', async ({ productoId }) => {
  return await eliminarProducto(productoId);
});

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    productos: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarrito.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarrito.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productos = action.payload;
      })
      .addCase(fetchCarrito.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProducto.fulfilled, (state, action) => {
        const existingProductIndex = state.productos.findIndex(
          (prod) => prod.id === action.payload.producto.id
        );

        if (existingProductIndex !== -1) {
          state.productos[existingProductIndex].cantidad = action.payload.producto.cantidad;
        } else {
          state.productos.push(action.payload.producto);
        }
      })
      .addCase(removeProducto.fulfilled, (state, action) => {
        state.productos = state.productos.filter(
          (prod) => prod.id !== action.meta.arg.productoId
        );
      });
  },
});
export default carritoSlice.reducer;


/* // redux/slices/carritoSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCarrito,
  addProductoAlCarrito,
  updateProductoCarrito,
  removeProductoDelCarrito,
} from "../../api/carrito";

// Obtener los productos en el carrito
export const getCarrito = createAsyncThunk(
  "carrito/getCarrito",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchCarrito(token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Agregar un producto al carrito
export const addAlCarrito = createAsyncThunk(
  "carrito/addAlCarrito",
  async ({ productoId, cantidad, token }, { rejectWithValue }) => {
    try {
      const response = await addProductoAlCarrito(productoId, cantidad, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Actualizar la cantidad de un producto en el carrito
export const updateCantidadCarrito = createAsyncThunk(
  "carrito/updateCantidadCarrito",
  async ({ productoId, cantidad, token }, { rejectWithValue }) => {
    try {
      const response = await updateProductoCarrito(productoId, cantidad, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Eliminar un producto del carrito
export const removeDelCarrito = createAsyncThunk(
  "carrito/removeDelCarrito",
  async ({ productoId, token }, { rejectWithValue }) => {
    try {
      await removeProductoDelCarrito(productoId, token);
      return productoId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    productos: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarrito.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCarrito.fulfilled, (state, action) => {
        console.log("Productos recibidos en Redux:", action.payload); // Verificar el payload
        state.loading = false;
        state.productos = action.payload;  // Verificar si productos se asignan correctamente
      })      
      .addCase(getCarrito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAlCarrito.fulfilled, (state, action) => {
        state.productos.push(action.payload);
      })
      .addCase(updateCantidadCarrito.fulfilled, (state, action) => {
        const index = state.productos.findIndex(
          (producto) => producto.id === action.payload.id
        );
        if (index !== -1) {
          state.productos[index] = action.payload;
        }
      })
      .addCase(removeDelCarrito.fulfilled, (state, action) => {
        state.productos = state.productos.filter(
          (producto) => producto.id !== action.payload
        );
      });
  },
});

export default carritoSlice.reducer;
 */