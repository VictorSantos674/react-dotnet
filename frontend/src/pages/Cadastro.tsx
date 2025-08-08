import { Form, Input, Button, Typography, Row, Col, message } from 'antd';
import Card from 'antd/es/card/Card';
import { useRegisterUserMutation } from '@/services/api/endpoints/authApi';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function Cadastro() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: { nome: string; email: string; senha: string }) => {
    try {
      const response = await registerUser(values).unwrap();

      if (response.token) {
        dispatch(setToken(response.token));
        message.success('Cadastro realizado e login efetuado com sucesso!');
        navigate('/home'); 
      } else {
        message.success('Cadastro realizado com sucesso! Faça login para continuar.');
        navigate('/login');
      }
    } catch (err) {
      message.error('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '1rem' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card>
          <Title level={3} style={{ textAlign: 'center' }}>Cadastro</Title>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
              <Input placeholder="Digite seu nome" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Digite seu email" />
            </Form.Item>
            <Form.Item name="senha" label="Senha" rules={[{ required: true, min: 6 }]}>
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
