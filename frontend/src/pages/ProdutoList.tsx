import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '@/services/api/endpoints/productApi';
import type { Product } from '@/types/Product';
import {
  Table,
  Button,
  message,
  Typography,
  Spin,
  Alert,
  Input,
  Empty,
  Row,
  Col,
  Space,
} from 'antd';
import Card from 'antd/es/card/Card';
import type { ColumnsType } from 'antd/es/table';
import { useState, type SetStateAction, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTableActions from '@/components/ProductTableActions';

const { Title } = Typography;

export default function ProdutoList() {
  const [searchTerm, setSearchTerm] = useState('');
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
      message.error('Erro ao excluir o produto.');
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnsType<Product> = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (preco) => (
        <span style={{ color: 'var(--color-accent)' }}>R$ {preco.toFixed(2)}</span>
      ),
    },
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

  const filteredData = useMemo(() => {
    if (!searchTerm) return paginatedData?.data || [];
    return paginatedData?.data?.filter((p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [searchTerm, paginatedData]);

  return (
    <Card
      style={{
        background: 'var(--color-card)',
        borderRadius: '12px',
        padding: '1rem',
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ color: 'var(--color-primary-dark)', marginBottom: 0 }}>
              Lista de Produtos
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              style={{
                backgroundColor: 'var(--color-accent)',
                borderColor: 'var(--color-accent)',
              }}
              onClick={() => navigate('/produtos/novo')}
            >
              Novo Produto
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} align="middle" style={{ maxWidth: 400 }}>
          <Col span={24}>
            <Input
              placeholder="Buscar por nome"
              value={searchTerm}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
              allowClear
              style={{
                borderRadius: '8px',
                borderColor: 'var(--color-accent)',
              }}
            />
          </Col>
        </Row>

        {isLoading ? (
          <Spin tip="Carregando produtos..." />
        ) : isError ? (
          <Alert
            message="Erro ao carregar produtos"
            description={
              (error as { data?: { message?: string } })?.data?.message ||
              'Tente novamente mais tarde.'
            }
            type="error"
            showIcon
          />
        ) : (
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            scroll={{ x: true }}
            pagination={{
              pageSize,
              current: page,
              total: paginatedData?.total,
              onChange: (newPage: SetStateAction<number>) => setPage(newPage),
            }}
            locale={{
              emptyText: <Empty description="Nenhum produto encontrado" />,
            }}
            style={{
              background: 'var(--color-card)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          />
        )}
      </Space>
    </Card>
  );
}
