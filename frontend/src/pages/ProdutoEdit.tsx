import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/services/api/endpoints/productApi";
import { toast } from "react-toastify";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: produto, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

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
    try {
      await updateProduct({
        id: Number(id),
        nome,
        preco,
        descricao,
      }).unwrap();

      toast.success("Produto atualizado com sucesso!");
      navigate("/listar");
    } catch (error) {
      toast.error("Erro ao atualizar o produto.");
    }
  };

  if (isLoading) return <p>Carregando produto...</p>;
  if (isError) return <p>Erro ao carregar o produto.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Produto</h2>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        required
      />
      <input
        type="number"
        value={preco}
        onChange={(e) => setPreco(+e.target.value)}
        placeholder="Preço"
        min={0}
        required
      />
      <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição"
        required
      />
      <button type="submit" disabled={isUpdating}>
        {isUpdating ? "Salvando..." : "Salvar Alterações"}
      </button>
    </form>
  );
}
