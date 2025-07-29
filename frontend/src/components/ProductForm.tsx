import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ProductFormValues } from '@/validations/productFormSchema';
import { productFormSchema } from '@/validations/productFormSchema';
import { Button, Form, Input, InputNumber } from 'antd';

interface Props {
  onSubmit: (data: ProductFormValues) => void;
  loading?: boolean;
  defaultValues?: Partial<ProductFormValues>;
}

export default function ProductForm({ onSubmit, loading = false, defaultValues }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues || {},
  });

  return (
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
        <InputNumber {...register('preco', { valueAsNumber: true })} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Descrição"
        validateStatus={errors.descricao ? 'error' : ''}
        help={errors.descricao?.message}
      >
        <Input.TextArea rows={4} {...register('descricao')} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
}
