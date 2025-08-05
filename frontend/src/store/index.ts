import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '@/services/api/endpoints/productApi';
import { authApi } from '@/services/api/endpoints/authApi';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
