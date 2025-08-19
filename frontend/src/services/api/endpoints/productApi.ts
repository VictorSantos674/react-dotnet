import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, PaginatedProductsResponse, ProductFilters } from '@/types/Product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/produto`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/',
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/${id}`,
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '/',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: ({ id, ...product }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    searchProducts: builder.query<Product[], string>({
      query: (nome) => `/buscar-por-nome/${encodeURIComponent(nome)}`,
    }),
    getProductsPaginated: builder.query<PaginatedProductsResponse, { page: number; pageSize: number; search?: string }>({
      query: ({ page, pageSize, search }) => {
        const params = new URLSearchParams();
        params.append('pageNumber', page.toString());
        params.append('pageSize', pageSize.toString());
        if (search) params.append('searchTerm', search);
        
        return `/paged?${params.toString()}`;
      },
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  useGetProductsPaginatedQuery,
} = productApi;