import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { Button, Space } from 'antd';
import { logout } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { nome, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
      <span>{nome ? `Olá, ${nome}` : 'Bem-vindo(a)'}</span>

      <Space>
        {!token ? (
          <>
            <Button onClick={() => navigate('/login')} type="default">Login</Button>
            <Button onClick={() => navigate('/cadastro')} type="primary">Cadastrar</Button>
          </>
        ) : (
          <Button onClick={handleLogout} type="primary" danger>Logout</Button>
        )}
      </Space>
    </nav>
  );
}
