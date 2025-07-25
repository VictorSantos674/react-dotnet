import { useAddProductMutation } from '@/services/api/endpoints/productApi';
import { useState } from 'react';

export default function Produto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');

  const [addProduct] = useAddProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({ nome, preco, descricao });
    setNome('');
    setPreco(0);
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input type="number" value={preco} onChange={(e) => setPreco(+e.target.value)} placeholder="Preço" />
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <button type="submit">Cadastrar Produto</button>
    </form>
  );
}
