export interface Product {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
}

export interface PaginatedProductsResponse {
  data: Product[];
  total: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
