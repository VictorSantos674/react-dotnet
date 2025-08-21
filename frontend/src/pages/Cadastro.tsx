import Card from 'antd/es/card/Card';
import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { useRegisterMutation } from '@/services/api/endpoints/authApi'; 
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice'; 
import { useNavigate } from 'react-router-dom';
import type { RegisterRequest } from '@/types/User';

const { Title } = Typography;

export default function Cadastro() {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterRequest) => {
    try {
      const response = await registerMutation(values).unwrap();
      dispatch(login(response)); // ✅ Usar login action
      message.success('Cadastro realizado e login efetuado com sucesso!');
      navigate('/home');
    } catch {
      message.error('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '2rem' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          }}
        >
          <Title level={3} style={{ textAlign: 'center', color: 'var(--color-primary)' }}>
            Cadastro
          </Title>
          <Form<RegisterRequest> layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
              <Input placeholder="Digite seu nome" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Digite seu email" />
            </Form.Item>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input placeholder="Digite seu username" />
            </Form.Item>
            <Form.Item name="password" label="Senha" rules={[{ required: true, min: 6 }]}>
              <Input.Password placeholder="Crie uma senha (mín. 6 caracteres)" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={isLoading} block>
                Cadastrar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}