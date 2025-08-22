import {
  useDeleteProductMutation,
  useGetProductsPaginatedQuery,
} from '@/services/api/endpoints/productApi';
import type { Product } from '@/types/Product';
import {
  Table,
  Button,
  Typography,
  Spin,
  Alert,
  Input,
  Empty,
  Row,
  Col
} from 'antd';
import Card from 'antd/es/card/Card';
import type { ColumnsType } from 'antd/es/table';
import { useState, type SetStateAction, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTableActions from '@/components/ProductTableActions';
import { useToast } from '@/hooks/useToast';
import { useBreakpoint } from '@/hooks/useBreakpoint';

const { Title } = Typography;

export default function ProdutoList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';

  const pageSize = 10;
  const [page, setPage] = useState(1);

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsPaginatedQuery({ 
    page: page, 
    pageSize: pageSize,
    search: searchTerm
  });

  const [deleteProduct] = useDeleteProductMutation();
  const [deletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
      showSuccess('Produto excluído com sucesso!');
      refetch();
    } catch (err) {
      showError('Erro ao excluir o produto');
    }
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      render: (_, record) => (
        <a onClick={() => navigate(`/produtos/${record.id}`)} style={{ cursor: 'pointer' }}>
          {record.nome}
        </a>
      ),
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (preco) => `R$ ${preco?.toFixed(2) || '0.00'}`,
      responsive: isMobile ? ['md'] : undefined,
    },
    { 
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao' 
    },
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
    return (
      paginatedData?.data?.filter((p: Product) =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [searchTerm, paginatedData]);

  return (
    <div className="fade-in" style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
      <Card
        className="slide-up card-hover"
        style={{
          background: 'var(--color-card)',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: '1.5rem' }}>
          <Col>
            <Title
              level={3}
              style={{ color: 'var(--color-primary)', marginBottom: 0 }}
            >
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

        <Row gutter={[16, 16]} align="middle" style={{ maxWidth: 400, marginBottom: '1rem' }}>
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
      </Card>
    </div>
  );
}