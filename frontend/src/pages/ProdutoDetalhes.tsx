import { Typography, Descriptions, Spin, Alert, Button } from 'antd';
import Card from 'antd/es/card/Card';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/services/api/endpoints/productApi';

const { Title } = Typography;

export default function ProdutoDetalhes() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: produto, isLoading, isError } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !produto) {
    return (
      <Alert
        message="Erro"
        description="Não foi possível carregar os detalhes do produto."
        type="error"
        showIcon
        style={{ marginTop: '2rem' }}
      />
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <Card
        style={{
          background: 'var(--color-card)',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        }}
      >
        <Title
          level={3}
          style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-primary)' }}
        >
          Detalhes do Produto
        </Title>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Nome">{produto.nome}</Descriptions.Item>
          <Descriptions.Item label="Preço">
            R$ {produto.preco.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Descrição">{produto.descricao}</Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Button type="primary" onClick={() => navigate('/produtos')}>
            Voltar para lista
          </Button>
        </div>
      </Card>
    </div>
  );
}