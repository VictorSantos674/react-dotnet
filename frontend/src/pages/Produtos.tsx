import { useGetAllProductsQuery, useDeleteProductMutation } from "@/services/api/endpoints/productApi";
import type { Product } from "@/types/Product";

export default function Produtos() {
  const { data: produto, isLoading, isError } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteProduct(id);
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar os produtos.</p>;

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {produto?.map((produto: Product) => (
          <li key={produto.id}>
            <strong>{produto.nome}</strong> - R$ {produto.preco.toFixed(2)} <br />
            {produto.descricao}
            <br />
            <button onClick={() => handleDelete(produto.id!)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
