import { Form, Input, Button, Typography, message, Row, Col } from 'antd';
import Card from 'antd/es/card/Card';
import { useLoginMutation } from '@/services/api/endpoints/authApi';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title } = Typography;

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname || '/home';

  const handleSubmit = async (values: { email: string; senha: string }) => {
    try {
      const response = await login(values).unwrap();
      dispatch(setToken(response.token));
      message.success('Login realizado com sucesso!');
      navigate(from, { replace: true });
    } catch {
      message.error('Email ou senha inválidos');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '1rem' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card>
          <Title level={3} style={{ textAlign: 'center', color: 'var(--color-primary)' }}>
            Login
          </Title>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a>
          </p>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input placeholder="Digite seu email" />
            </Form.Item>
            <Form.Item name="senha" label="Senha" rules={[{ required: true }]}>
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