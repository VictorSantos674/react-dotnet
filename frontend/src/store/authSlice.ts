import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

interface TokenPayload {
  nome: string;
  email: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

interface AuthState {
  token: string | null;
  nome: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  nome: null,
  email: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      const decoded = jwtDecode<TokenPayload>(action.payload);
      state.token = action.payload;
      state.nome = decoded.nome;
      state.email = decoded.email;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    },
    setCredentials: (state, action: PayloadAction<string>) => {
      const decoded = jwtDecode<TokenPayload>(action.payload);
      state.token = action.payload;
      state.nome = decoded.nome;
      state.email = decoded.email;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.nome = null;
      state.email = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    initializeAuth: (state) => {
      if (state.token) {
        try {
          const decoded = jwtDecode<TokenPayload>(state.token);
          state.nome = decoded.nome;
          state.email = decoded.email;
          state.isAuthenticated = true;
        } catch (error) {
          state.token = null;
          state.nome = null;
          state.email = null;
          state.isAuthenticated = false;
          localStorage.removeItem('token');
        }
      }
    },
  },
});

export const { setToken, setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => ({
  nome: state.auth.nome,
  email: state.auth.email,
});