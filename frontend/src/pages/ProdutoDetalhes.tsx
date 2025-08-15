import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/services/api/endpoints/productApi';
import { Typography, Button, Spin, Alert } from 'antd';
import Card from 'antd/es/card/Card';

const { Title, Paragraph } = Typography;

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));

  if (isLoading) {
    return <Spin tip="Carregando produto..." />;
  }

  if (isError || !product) {
    return (
      <Alert
        message="Erro"
        description="Produto não encontrado."
        type="error"
        showIcon
      />
    );
  }

  return (
    <Card
      style={{
        background: 'var(--color-card)',
        padding: '1.5rem',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <Title level={3} style={{ color: 'var(--color-primary)' }}>
        {product.nome}
      </Title>
      <Paragraph style={{ fontSize: '16px', marginBottom: '1rem' }}>
        {product.descricao || 'Sem descrição'}
      </Paragraph>
      <Paragraph strong style={{ fontSize: '18px', color: 'var(--color-accent)' }}>
        Preço: R$ {product.preco.toFixed(2)}
      </Paragraph>
      <Button
        type="primary"
        onClick={() => navigate('/produtos')}
        style={{
          background: 'var(--color-accent)',
          borderColor: 'var(--color-accent)',
          marginTop: '1rem',
        }}
      >
        Voltar
      </Button>
    </Card>
  );
}