// frontend/src/pages/ProdutoEdit.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation
} from '@/services/api/endpoints/productApi'; 
import { productFormSchema, type ProductFormValues } from '@/validations/productFormSchema';
import { Form, Input, InputNumber, Button, Typography, Spin } from 'antd';
import { useToast } from '@/hooks/useToast';

const { Title } = Typography;

export default function ProdutoEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast(); 
  const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema)
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await updateProduct({ id: Number(id), ...data }).unwrap();
      showSuccess('Produto atualizado com sucesso!'); 
      navigate('/produtos');
    } catch (err) {
      showError('Erro ao atualizar o produto.'); 
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Spin size="large" tip="Carregando produto..." />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Typography.Text type="danger">Erro ao carregar o produto.</Typography.Text>
      </div>
    );
  }

  setValue('nome', product.nome);
  setValue('preco', product.preco);
  setValue('descricao', product.descricao);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '1rem' }}>
      <Title level={3}>Editar Produto</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Nome"
          validateStatus={errors.nome ? 'error' : ''}
          help={errors.nome?.message}
        >
          <Input {...register('nome')} />
        </Form.Item>

        <Form.Item
          label="Preço"
          validateStatus={errors.preco ? 'error' : ''}
          help={errors.preco?.message}
        >
          <InputNumber {...register('preco')} style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item
          label="Descrição"
          validateStatus={errors.descricao ? 'error' : ''}
          help={errors.descricao?.message}
        >
          <Input.TextArea rows={4} {...register('descricao')} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isUpdating}>
            Atualizar Produto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}