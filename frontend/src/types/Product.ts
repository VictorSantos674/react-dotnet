export interface Product {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedProductsResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ProductFilters {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
}