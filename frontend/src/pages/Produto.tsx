import ProductForm from '@/components/ProductForm';
import { useAddProductMutation } from '@/services/api/endpoints/productApi';
import type { ProductFormValues } from '@/validations/productFormSchema';
import { message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Produto() {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      await addProduct(data).unwrap();
      message.success('Produto cadastrado com sucesso!');
      navigate('/produtos');
    } catch {
      message.error('Erro ao cadastrar o produto.');
    }
  };

  return (
    <div style={{  maxWidth: 600, margin: '0 auto', padding: '1rem'  }}>
      <Typography.Title level={2}>Cadastrar Produto</Typography.Title>
      <ProductForm onSubmit={handleSubmit} loading={isLoading} submitText="Criar Produto"/>
    </div>
  );
}