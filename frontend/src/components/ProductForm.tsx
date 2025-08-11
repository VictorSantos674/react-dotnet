import { Form, Input, InputNumber, Button, Typography } from 'antd';
import Card from 'antd/es/card/Card';
import { Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ProductFormValues, productFormSchema } from '@/validations/productFormSchema';
import { useForm } from 'react-hook-form';

const { Title } = Typography;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => Promise<void>;
  loading: boolean;
  submitText?: string;
  defaultValues?: ProductFormValues;
}

export default function ProductForm({
  onSubmit,
  loading,
  submitText = 'Salvar',
  defaultValues,
}: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues || {
      nome: '',
      preco: 0,
      descricao: '',
    },
  });

  const handleFormSubmit = async (data: ProductFormValues) => {
    await onSubmit(data);
    reset(); 
  };

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={4}>
        {submitText === 'Salvar' ? 'Cadastrar Produto' : 'Editar Produto'}
      </Title>
      <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
        <Form.Item label="Nome" validateStatus={errors.nome ? 'error' : ''} help={errors.nome?.message}>
          <Controller
            name="nome"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nome do produto" />}
          />
        </Form.Item>

        <Form.Item label="Preço" validateStatus={errors.preco ? 'error' : ''} help={errors.preco?.message}>
          <Controller
            name="preco"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} min={0} style={{ width: '100%' }} placeholder="Preço" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Descrição"
          validateStatus={errors.descricao ? 'error' : ''}
          help={errors.descricao?.message}
        >
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Descrição do produto" rows={4} />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
