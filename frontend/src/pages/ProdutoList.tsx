import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '@/services/api/endpoints/productApi';
import type { Product } from '@/types/Product';
import {
  Table,
  Button,
  message,
  Space,
  Typography,
  Spin,
  Alert,
  Input,
  Empty,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import ProductTableActions from '@/components/ProductTableActions';

const { Title } = Typography;

export default function ProdutoList() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  const pageSize = 10;
  const [page, setPage] = useState(1);

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllProductsQuery({ pageNumber: page, pageSize });

  const [deleteProduct] = useDeleteProductMutation();
  const [deletingId, setDeletingId] = useState<number | null>(null);

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
        <ProductTableActions
          id={record.id!}
          onDelete={handleDelete}
          loading={deletingId === record.id}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <Space
        style={{ marginBottom: '1rem', justifyContent: 'space-between', width: '100%' }}
        direction="vertical"
        size="middle"
      >
        <Title level={3}>Lista de Produtos</Title>

        <Input
          placeholder="Buscar por nome"
          value={searchTerm}
          onChange={(e: { target: { value: SetStateAction<string>; } }) =>
            setSearchTerm(e.target.value)}
          style={{ maxWidth: 300 }}
        />

        <Button type="primary" onClick={() => navigate('/produtos/novo')}>
          Novo Produto
        </Button>
      </Space>

      {isLoading ? (
        <Spin tip="Carregando produtos..." />
      ) : isError ? (
        <Alert
          message="Erro ao carregar produtos"
          description={(error as { data?: { message?: string } })?.data?.message || 'Tente novamente mais tarde.'}
          type="error"
          showIcon
        />
      ) : (
        <Table
          dataSource={paginatedData?.data || []}
          columns={columns}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{
            pageSize,
            current: page,
            total: paginatedData?.total,
            onChange: (newPage: number) => setPage(newPage),
          }}
          locale={{ emptyText: <Empty description="Nenhum produto encontrado" /> }}
        />
      )}
    </div>
  );
}
