import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/services/api/endpoints/productApi';
import { message, Spin } from 'antd';
import ProductForm from '@/components/ProductForm';
import type { ProductFormValues } from '@/validations/productFormSchema';

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const [updateProduct] = useUpdateProductMutation();

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      message.loading({ content: 'Atualizando produto...', key: 'update' });
      await updateProduct({ ...values, id: Number(id) }).unwrap();
      message.success({ content: 'Produto atualizado com sucesso!', key: 'update' });
      navigate('/produtos');
    } catch {
      message.error({ content: 'Erro ao atualizar produto', key: 'update' });
    }
  };

  if (isLoading) return <Spin tip="Carregando produto..." />;
  if (isError || !data) return <p>Erro ao carregar produto.</p>;

  return (
    <div>
      <h2>Editar Produto</h2>
      <ProductForm onSubmit={handleSubmit} defaultValues={data} loading={false} />
    </div>
  );
}
