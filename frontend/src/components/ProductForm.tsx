import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, InputNumber } from 'antd';
import { useForm } from 'react-hook-form';
import { productFormSchema, type ProductFormValues } from '@/validations/productFormSchema';

type ProductFormProps = {
  onSubmit: (data: ProductFormValues) => void;
  loading: boolean;
  defaultValues?: ProductFormValues; 
  submitText?: string;
};

export default function ProductForm({ onSubmit, loading, defaultValues }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const internalSubmit = (data: ProductFormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(internalSubmit)}>
      <Form.Item label="Nome" validateStatus={errors.nome ? 'error' : ''} help={errors.nome?.message}>
        <Input {...register('nome')} />
      </Form.Item>

      <Form.Item label="Preço" validateStatus={errors.preco ? 'error' : ''} help={errors.preco?.message}>
        <InputNumber {...register('preco', { valueAsNumber: true })} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Descrição" validateStatus={errors.descricao ? 'error' : ''} help={errors.descricao?.message}>
        <Input.TextArea rows={4} {...register('descricao')} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Cadastrar
        </Button>
      </Form.Item>
    </Form>
  );
}
