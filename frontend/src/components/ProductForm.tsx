import { Form, Input, InputNumber, Button, Typography, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@/services/api/endpoints/productApi';
import { useEffect } from 'react';
import Card from 'antd/es/card/Card';

const { Title } = Typography;

export default function ProdutoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: productData, isLoading: isFetching } = useGetProductByIdQuery(Number(id), {
    skip: !isEdit,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (productData) {
      form.setFieldsValue(productData);
    }
  }, [productData, form]);

  const handleSubmit = async (values: { nome: string; preco: number; descricao: string }) => {
    try {
      if (isEdit) {
        await updateProduct({ id: Number(id), ...values }).unwrap();
        message.success('Produto atualizado com sucesso!');
      } else {
        await addProduct(values).unwrap();
        message.success('Produto adicionado com sucesso!');
      }
      navigate('/produtos');
    } catch {
      message.error('Erro ao salvar o produto.');
    }
  };

  return (
    <Card style={{ background: 'var(--color-card)', padding: '1.5rem' }}>
      <Title level={3} style={{ color: 'var(--color-primary)', textAlign: 'center' }}>
        {isEdit ? 'Editar Produto' : 'Novo Produto'}
      </Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        style={{ marginTop: '1rem' }}
      >
        <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
          <Input placeholder="Digite o nome do produto" />
        </Form.Item>

        <Form.Item name="preco" label="Preço" rules={[{ required: true, type: 'number', min: 0 }]}>
          <InputNumber
            placeholder="Digite o preço"
            style={{ width: '100%' }}
            formatter={(value: any) => `R$ ${value}`}
            parser={(value: string) => value?.replace(/\D/g, '') || ''}
          />
        </Form.Item>

        <Form.Item name="descricao" label="Descrição">
          <Input.TextArea rows={4} placeholder="Digite a descrição do produto" />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isAdding || isUpdating || isFetching}
            style={{
              background: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
            }}
          >
            {isEdit ? 'Atualizar' : 'Cadastrar'}
          </Button>
          <Button
            style={{ marginLeft: '1rem' }}
            onClick={() => navigate('/produtos')}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}