import { Col, Row, Statistic, Typography, List, Avatar, Button } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Card from 'antd/es/card/Card';

const { Title } = Typography;

export default function Home() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Produtos Cadastrados', value: 128, icon: <ShoppingCartOutlined style={{ fontSize: 24, color: 'var(--color-accent)' }} /> },
    { title: 'Vendas do Mês', value: 'R$ 12.540', icon: <DollarOutlined style={{ fontSize: 24, color: 'var(--color-accent)' }} /> },
    { title: 'Clientes Ativos', value: 56, icon: <UserOutlined style={{ fontSize: 24, color: 'var(--color-accent)' }} /> },
  ];

  const ultimosProdutos = [
    { id: 1, nome: 'Açaí Tradicional', preco: 15.9 },
    { id: 2, nome: 'Açaí com Morango', preco: 18.5 },
    { id: 3, nome: 'Açaí com Granola', preco: 16.0 },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <Title level={2} style={{ color: 'var(--color-primary)' }}>
        Dashboard CRM
      </Title>
      <p style={{ color: 'var(--color-text)' }}>Resumo das principais informações do sistema</p>

      <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card style={{ background: 'var(--color-card)', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'var(--color-text)' }}>{stat.title}</span>}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: 'var(--color-accent)' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        style={{ marginTop: '2rem', background: 'var(--color-card)', borderRadius: '12px' }}
        title={<span style={{ color: 'var(--color-text)' }}>Últimos Produtos</span>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}
            onClick={() => navigate('/produtos/novo')}
          >
            Novo Produto
          </Button>
        }
      >
        <List
          itemLayout="horizontal"
          dataSource={ultimosProdutos}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => navigate(`/produtos/${item.id}`)}
                  style={{ padding: 0 }}
                >
                  Ver
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: 'var(--color-accent)' }}>{item.nome[0]}</Avatar>}
                title={<span style={{ color: 'var(--color-text)' }}>{item.nome}</span>}
                description={<span style={{ color: 'var(--color-secondary)' }}>R$ {item.preco.toFixed(2)}</span>}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
