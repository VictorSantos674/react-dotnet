import { Typography, message } from 'antd';
import Card from 'antd/es/card/Card';
import ProductForm from '@/components/ProductForm';
import { useCreateProductMutation } from '@/services/api/endpoints/productApi'; 
import type { ProductFormValues } from '@/validations/productFormSchema';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function Produto() {
  const [createProduct, { isLoading }] = useCreateProductMutation(); 
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      await createProduct(data).unwrap(); // ✅ Nome correto
      message.success('Produto cadastrado com sucesso!');
      navigate('/produtos');
    } catch {
      message.error('Erro ao cadastrar o produto.');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem' }}>
      <Card
        style={{
          background: 'var(--color-card)',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        }}
      >
        <Title
          level={3}
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: 'var(--color-primary)',
          }}
        >
          Cadastrar Produto
        </Title>

        <ProductForm
          onSubmit={handleSubmit}
          loading={isLoading}
          submitText="Criar Produto"
        />
      </Card>
    </div>
  );
}