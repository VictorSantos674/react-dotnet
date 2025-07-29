import { useAddProductMutation } from '@/services/api/endpoints/productApi';
import ProductForm from '@/components/ProductForm';
import { ProductFormValues } from '@/validations/productSchema';
import { message, Typography } from 'antd';

export default function Produto() {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleSubmit = async (data: ProductFormValues) => {
    try {
      await addProduct(data).unwrap();
      message.success('Produto cadastrado com sucesso!');
    } catch {
      message.error('Erro ao cadastrar o produto.');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={2}>Cadastrar Produto</Typography.Title>
      <ProductForm onSubmit={handleSubmit} loading={isLoading} />
    </div>
  );
}
