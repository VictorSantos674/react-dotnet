import { useRegisterUserMutation } from '@/services/api/endpoints/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Input, Button, Space, Typography } from 'antd';
import { useAppDispatch } from '@/store/authSlice';
import { setToken } from '@/store/authSlice';

const { Title } = Typography;

export default function Register() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(form).unwrap();
      dispatch(setToken(response.token)); 
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
        <Input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <Input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
        <Input.Password name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />
        <Button type="primary" onClick={handleSubmit} loading={isLoading}>
          Cadastrar
        </Button>
      </Space>
    </div>
  );
}
