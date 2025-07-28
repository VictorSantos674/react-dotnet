import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/services/api/endpoints/productApi";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: produto, isLoading } = useGetProductByIdQuery(Number(id));
  const [updateProduct] = useUpdateProductMutation();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (produto) {
      setNome(produto.nome);
      setPreco(produto.preco);
      setDescricao(produto.descricao);
    }
  }, [produto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct({
      id: Number(id),
      nome,
      preco,
      descricao,
    });
    navigate("/listar");
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Produto</h2>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input type="number" value={preco} onChange={(e) => setPreco(+e.target.value)} placeholder="Preço" />
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <button type="submit">Salvar Alterações</button>
    </form>
  );
}
