import { Form, Input, Button, Typography, message } from 'antd';
import { useLoginMutation } from '@/services/api/endpoints/authApi';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; senha: string }) => {
    try {
      const response = await login(values).unwrap();
      dispatch(setToken(response.token));
      message.success('Login realizado com sucesso!');
      navigate('/produtos');
    } catch (err) {
      console.error(err);
      message.error('Email ou senha inválidos');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto' }}>
      <Title level={2}>Login</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="senha" label="Senha" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={isLoading} block>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
