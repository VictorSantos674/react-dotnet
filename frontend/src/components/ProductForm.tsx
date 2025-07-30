import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema, type ProductFormValues } from '@/validations/productFormSchema';
import { useAddProductMutation } from '@/services/api/endpoints/productApi';
import { Button, Form, Input, InputNumber, message, Spin } from 'antd';

export default function ProductForm() {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await addProduct(data).unwrap();
      message.success('Produto cadastrado com sucesso!');
      reset();
    } catch (err) {
      message.error('Erro ao cadastrar o produto.');
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <Form.Item label="Nome" validateStatus={errors.nome ? 'error' : ''} help={errors.nome?.message}>
        <Input {...register('nome')} placeholder="Nome do produto" />
      </Form.Item>

      <Form.Item label="Preço" validateStatus={errors.preco ? 'error' : ''} help={errors.preco?.message}>
        <InputNumber {...register('preco', { valueAsNumber: true })} placeholder="Preço" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Descrição" validateStatus={errors.descricao ? 'error' : ''} help={errors.descricao?.message}>
        <Input.TextArea {...register('descricao')} placeholder="Descrição" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          {isLoading ? <Spin size="small" /> : 'Cadastrar Produto'}
        </Button>
      </Form.Item>
    </Form>
  );
}
