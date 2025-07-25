import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '@/types/Product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => 'produto',
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `produto/${id}`,
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: 'produto',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: `produto/${product.id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `produto/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
