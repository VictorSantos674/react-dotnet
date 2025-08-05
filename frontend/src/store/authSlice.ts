import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import type { RootState } from '.';

interface AuthState {
  token: string | null;
  nome: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  nome: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      const decoded = jwtDecode<{ nome: string }>(action.payload);
      state.token = action.payload;
      state.nome = decoded.nome;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.nome = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
