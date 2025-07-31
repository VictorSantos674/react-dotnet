import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/services/api/endpoints/productApi';
import { message, Spin } from 'antd';
import ProductForm from '@/components/ProductForm';
import type { ProductFormValues } from '@/validations/productFormSchema';

export default function EditarProduto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      message.loading({ content: 'Atualizando produto...', key: 'update' });
      await updateProduct({ id: Number(id), ...values }).unwrap();
      message.success({ content: 'Produto atualizado com sucesso!', key: 'update' });
      navigate('/produtos');
    } catch (err) {
      console.error(err);
      message.error({ content: 'Erro ao atualizar produto', key: 'update' });
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Spin size="large" tip="Carregando produto..." />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p>Erro ao carregar o produto para edição.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Editar Produto</h2>
      <ProductForm
        onSubmit={handleSubmit}
        defaultValues={product}
        loading={false}
      />
    </div>
  );
}