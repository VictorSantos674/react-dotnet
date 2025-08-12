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
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues || {
      nome: '',
      preco: 0,
      descricao: '',
    },
  });

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: '0 auto',
        background: 'var(--color-card)',
        borderRadius: '12px',
      }}
    >
      <Title level={4} style={{ color: 'var(--color-primary-dark)' }}>
        {submitText === 'Salvar' ? 'Cadastrar Produto' : 'Editar Produto'}
      </Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label={<span style={{ color: 'var(--color-text)' }}>Nome</span>}
          validateStatus={errors.nome ? 'error' : ''}
          help={errors.nome?.message}
        >
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nome do produto"
                style={{ borderRadius: '8px', borderColor: 'var(--color-accent)' }}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'var(--color-text)' }}>Preço</span>}
          validateStatus={errors.preco ? 'error' : ''}
          help={errors.preco?.message}
        >
          <Controller
            name="preco"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={0}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  borderColor: 'var(--color-accent)',
                }}
                placeholder="Preço"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'var(--color-text)' }}>Descrição</span>}
          validateStatus={errors.descricao ? 'error' : ''}
          help={errors.descricao?.message}
        >
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Descrição do produto"
                rows={4}
                style={{ borderRadius: '8px', borderColor: 'var(--color-accent)' }}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              backgroundColor: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
            }}
          >
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
