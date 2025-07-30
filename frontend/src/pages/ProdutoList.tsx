import { useDeleteProductMutation, useGetAllProductsQuery } from '@/services/api/endpoints/productApi';
import { Table, Button, Space, message, Popconfirm, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/Product';

export default function ProdutoList() {
  const navigate = useNavigate();
  const { data: products = [], isLoading, isError } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    try {
      message.loading({ content: 'Removendo produto...', key: 'delete' });
      await deleteProduct(id).unwrap();
      message.success({ content: 'Produto removido com sucesso!', key: 'delete' });
    } catch {
      message.error({ content: 'Erro ao remover produto', key: 'delete' });
    }
  };

  const columns: ColumnsType<Product> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Preço', dataIndex: 'preco', key: 'preco' },
    { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => navigate(`/editar-produto/${record.id}`)}>Editar</Button>
          <Popconfirm
            title="Tem certeza que deseja excluir este produto?"
            onConfirm={() => record.id !== undefined && handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger>Excluir</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Spin tip="Carregando produtos..." />;
  if (isError) return <p>Erro ao carregar produtos.</p>;

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <Table columns={columns} dataSource={products} rowKey="id" />
    </div>
  );
}
