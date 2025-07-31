import { useDeleteProductMutation, useGetAllProductsQuery } from '@/services/api/endpoints/productApi';
import type { Product } from '@/types/Product';
import { Table, Button, Popconfirm, message, Space, Typography, Spin, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function ProdutoList() {
  const { data: products, isLoading, isError, error, refetch } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await deleteProduct(id).unwrap();
      message.success('Produto excluído com sucesso!');
      refetch();
    } catch (err) {
      console.error(err);
      message.error('Erro ao excluir o produto.');
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnsType<Product> = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    { title: 'Preço', dataIndex: 'preco', key: 'preco' },
    { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/produtos/editar/${record.id}`)}>
            Editar
          </Button>
          <Popconfirm
            title="Tem certeza que deseja excluir este produto?"
            onConfirm={() => handleDelete(record.id!)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger loading={deletingId === record.id}>
              Excluir
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <Space style={{ marginBottom: '1rem', justifyContent: 'space-between', width: '100%' }}>
        <Title level={3}>Lista de Produtos</Title>
        <Button type="primary" onClick={() => navigate('/produtos/novo')}>
          Novo Produto
        </Button>
      </Space>

      {isLoading ? (
        <Spin tip="Carregando produtos..." />
      ) : isError ? (
        <Alert
          message="Erro ao carregar produtos"
          description={(error as any)?.data?.message || 'Tente novamente mais tarde.'}
          type="error"
          showIcon
        />
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
}
