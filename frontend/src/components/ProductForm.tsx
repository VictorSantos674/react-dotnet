import { Form, Input, InputNumber, Button, Typography } from 'antd';
import Card from 'antd/es/card/Card';
import type { ProductFormValues } from '@/validations/productFormSchema';

const { Title } = Typography;

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => Promise<void>;
  loading: boolean;
  submitText: string;
}

export default function ProductForm({ onSubmit, loading, submitText }: ProductFormProps) {
  const [form] = Form.useForm<ProductFormValues>();

  const handleFinish = async (values: ProductFormValues) => {
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Card
      style={{
        background: 'var(--color-card)',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
      }}
    >
      <Title
        level={4}
        style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: 'var(--color-primary)',
        }}
      >
        Formulário de Produto
      </Title>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="nome"
          label="Nome"
          rules={[{ required: true, message: 'Digite o nome do produto' }]}
        >
          <Input placeholder="Nome do produto" />
        </Form.Item>

        <Form.Item
          name="preco"
          label="Preço"
          rules={[{ required: true, message: 'Digite o preço do produto' }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            placeholder="Preço do produto"
          />
        </Form.Item>

        <Form.Item
          name="descricao"
          label="Descrição"
          rules={[{ required: true, message: 'Digite a descrição do produto' }]}
        >
          <Input.TextArea rows={4} placeholder="Descrição do produto" />
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