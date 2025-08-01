import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/types/Product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/products" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "",
      providesTags: ["Product"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/${id}`,
    }),
    addProduct: builder.mutation<void, Partial<Product>>({
      query: (product) => ({
        url: "",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<void, Product>({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Product"],
    }),
    getProductsByName: builder.query<Product[], string>({
      query: (nome) => `produto/BuscarPorNome?nome=${encodeURIComponent(nome)}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByNameQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
