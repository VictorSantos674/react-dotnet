import { useGetProdutosQuery } from "../store/endpoints/produtos";

function Produtos() {
  const { data, isLoading, isError } = useGetProdutosQuery();

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar os produtos.</p>;

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {data?.map((produto) => (
          <li key={produto.id}>{produto.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
