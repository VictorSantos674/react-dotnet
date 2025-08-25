import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product, PaginatedProductsResponse } from '@/types/Product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/produto`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/',
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: 'Product' as const, id: p.id })),
              { type: 'Product' as const, id: 'LIST' },
            ]
          : [{ type: 'Product' as const, id: 'LIST' }],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Product', id }],
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '/',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<Product, Product>({
      query: ({ id, ...product }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Product', id }, { type: 'Product', id: 'LIST' }],
    }),

    // Excluir
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [{ type: 'Product', id }, { type: 'Product', id: 'LIST' }],
    }),

    searchProducts: builder.query<Product[], string>({
      query: (nome) => `/buscar-por-nome/${encodeURIComponent(nome)}`,
    }),

    getProductsPaginated: builder.query<
      PaginatedProductsResponse,
      { page: number; pageSize: number; search?: string }
    >({
      query: ({ page, pageSize, search }) => {
        const params = new URLSearchParams();
        params.append('pageNumber', page.toString());
        params.append('pageSize', pageSize.toString());
        if (search) params.append('searchTerm', search);
        return `/paged?${params.toString()}`;
      },
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    getAllProducts: builder.query<
      PaginatedProductsResponse,
      { pageNumber: number; pageSize: number; searchTerm?: string }
    >({
      query: ({ pageNumber, pageSize, searchTerm }) => {
        const params = new URLSearchParams();
        params.append('pageNumber', pageNumber.toString());
        params.append('pageSize', pageSize.toString());
        if (searchTerm) params.append('searchTerm', searchTerm);
        return `/paged?${params.toString()}`;
      },
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  useGetProductsPaginatedQuery,
  useGetAllProductsQuery, 
} = productApi;

export {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  useGetProductsPaginatedQuery,
  useGetAllProductsQuery,
};