import { useRegisterUserMutation } from '@/services/api/endpoints/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Input, Button, Space, Typography } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/slices/authSlice';

const { Title } = Typography;

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { token } = await registerUser(form).unwrap();
      dispatch(setToken(token));
      message.success('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (err: any) {
      message.error(err.data?.message || 'Erro no cadastro');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: '2rem' }}>
      <Title level={3}>Cadastro</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
        <Input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
        <Input.Password name="password" placeholder="Senha" value={form.password} onChange={handleChange} />
        <Button type="primary" onClick={handleSubmit} loading={isLoading}>
          Cadastrar
        </Button>
      </Space>
    </div>
  );
}
