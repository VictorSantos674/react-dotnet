import { Form, Input, Button, Typography, message, Row, Col } from 'antd';
import Card from 'antd/es/card/Card';
import { useLoginMutation } from '@/services/api/endpoints/authApi';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice'; 
import { useNavigate, useLocation } from 'react-router-dom';
import type { LoginRequest } from '@/types/User';

const { Title } = Typography;

export default function Login() {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/home';

  const handleSubmit = async (values: LoginRequest) => {
    try {
      const response = await loginMutation(values).unwrap();
      dispatch(login(response)); // ✅ Usar login action
      message.success('Login realizado com sucesso!');
      navigate(from, { replace: true });
    } catch {
      message.error('Username ou senha inválidos');
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
            Login
          </Title>
          <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a>
          </p>
          <Form<LoginRequest> layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input placeholder="Digite seu username" />
            </Form.Item>
            <Form.Item name="password" label="Senha" rules={[{ required: true }]}>
              <Input.Password placeholder="Digite sua senha" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={isLoading} block>
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}