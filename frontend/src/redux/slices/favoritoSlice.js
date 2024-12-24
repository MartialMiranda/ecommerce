// redux/slices/favoritoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFavoritos, addFavorito, removeFavorito } from "../../api/favoritos";

export const getFavoritos = createAsyncThunk(
  "favoritos/getFavoritos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchFavoritos();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addFavoritoAction = createAsyncThunk(
  "favoritos/addFavorito",
  async (productoId, { rejectWithValue }) => {
    try {
      const response = await addFavorito(productoId);
      return { ...response.data, productoId };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeFavoritoAction = createAsyncThunk(
  "favoritos/removeFavorito",
  async (productoId, { rejectWithValue }) => {
    try {
      await removeFavorito(productoId);
      return { productoId };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const favoritosSlice = createSlice({
  name: "favoritos",
  initialState: {
    favoritos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavoritos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavoritos.fulfilled, (state, action) => {
        state.loading = false;
        state.favoritos = action.payload;
      })
      .addCase(getFavoritos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFavoritoAction.fulfilled, (state, action) => {
        state.favoritos.push(action.payload);
      })
      .addCase(removeFavoritoAction.fulfilled, (state, action) => {
        state.favoritos = state.favoritos.filter(
          (favorito) => favorito.productoId !== action.payload.productoId
        );
      });
  },
});

export default favoritosSlice.reducer;