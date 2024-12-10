import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { obtenerCarrito, agregarProducto, eliminarProducto } from "../../api/carrito";

// Thunks asincrónicos
export const fetchCarrito = createAsyncThunk("carrito/fetchCarrito", async (_, { rejectWithValue }) => {
  try {
    const productos = await obtenerCarrito(); // Solo obtiene productos
    return productos;
  } catch (error) {
    return rejectWithValue(error.message || "Error al obtener el carrito");
  }
});

export const addProducto = createAsyncThunk(
  "carrito/addProducto",
  async ({ productoId, cantidad }, { rejectWithValue }) => {
    try {
      const response = await agregarProducto(productoId, cantidad);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Error al agregar el producto");
    }
  }
);

export const removeProducto = createAsyncThunk(
  "carrito/removeProducto",
  async ({ productoId }, { rejectWithValue }) => {
    try {
      await eliminarProducto(productoId);
      return productoId;
    } catch (error) {
      return rejectWithValue(error.message || "Error al eliminar el producto");
    }
  }
);

// Slice del carrito
const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    productos: [],
    status: "idle", // "idle", "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener carrito
      .addCase(fetchCarrito.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCarrito.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productos = action.payload;
      })
      .addCase(fetchCarrito.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //agregar producto
      .addCase(addProducto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProducto.fulfilled, (state, action) => {
        const producto = action.payload;
        const existingProductIndex = state.productos.findIndex(
          (prod) => prod.id === producto.id
        );
      
        if (existingProductIndex !== -1) {
          // Actualizamos el producto existente
          state.productos[existingProductIndex] = {
            ...state.productos[existingProductIndex],
            cantidad: producto.cantidad,
          };
        } else {
          // Agregamos un nuevo producto
          state.productos.push(producto);
        }
      
        state.status = "succeeded";
      })      
      .addCase(addProducto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Eliminar producto
      .addCase(removeProducto.fulfilled, (state, action) => {
        const productoId = action.payload;
        state.productos = state.productos.filter((prod) => prod.id !== productoId);
      });
  },
});

export default carritoSlice.reducer;
