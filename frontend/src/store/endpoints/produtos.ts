import { api } from "../api";

export const produtosApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProdutos: build.query<{ id: number; nome: string }[], void>({
      query: () => "produtos",
    }),
  }),
});

export const { useGetProdutosQuery } = produtosApi;
