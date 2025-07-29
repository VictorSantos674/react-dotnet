import { useGetAllProductsQuery, useDeleteProductMutation } from "@/services/api/endpoints/productApi";
import type { Product } from "@/types/Product";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProdutoList() {
  const { data: produtos, isLoading, isError } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Produto excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir o produto.");
      }
    }
  };

  if (isLoading) return <p>Carregando produtos...</p>;
  if (isError) return <p>Erro ao carregar os produtos.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Produtos</h2>
      {produtos?.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nome</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Preço</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Descrição</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {(produtos ?? []).map((produto: Product) => (
              <tr key={produto.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{produto.nome}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>R$ {produto.preco.toFixed(2)}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{produto.descricao}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <Link to={`/produtos/editar/${produto.id}`}>
                    <button style={{ marginRight: '10px' }}>Editar</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(produto.id!)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Excluindo..." : "Excluir"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
