import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { obtenerUsuarioPorId } from '../../api/auth';

// Acción asincrónica para obtener un usuario por ID
export const fetchUsuarioById = createAsyncThunk(
  'auth/fetchUsuarioById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await obtenerUsuarioPorId(id);
      return response.data.data; // Extraemos solo el objeto de usuario de la respuesta
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error al obtener el usuario.');
    }
  }
);

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth');

  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  }

  return false;
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  usuario: null, // Guardará la información del usuario
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true;
    },
    unauthenticateUser: (state) => {
      state.isAuth = false;
      state.usuario = null; // Limpia la información del usuario al cerrar sesión
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsuarioById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarioById.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload;
      })
      .addCase(fetchUsuarioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;

export default authSlice.reducer;
