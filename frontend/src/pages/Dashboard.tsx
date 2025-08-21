import { Col, Row, Typography, Spin, Alert } from 'antd';
import Card from 'antd/es/card/Card';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useGetProductsQuery } from '@/services/api/endpoints/productApi';

const { Title } = Typography;

export default function Dashboard() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  const totalProducts = products?.length || 0;
  const totalUsers = 5;

  if (isLoading) {
    return <Spin tip="Carregando resumo..." style={{ display: 'block', margin: '2rem auto' }} />;
  }

  if (isError) {
    return <Alert message="Erro ao carregar dashboard" type="error" showIcon />;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <ShoppingCartOutlined style={{ fontSize: '2rem', color: '#722ED1' }} />
            <Title level={4}>Produtos</Title>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalProducts}</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <UserOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
            <Title level={4}>Usuários</Title>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalUsers}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}