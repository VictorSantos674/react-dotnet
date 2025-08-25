import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { authApi } from '@/services/api/endpoints/authApi'
import { productApi } from '@/services/api/endpoints/productApi'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store