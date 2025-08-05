import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { Button } from 'antd';
import { logout } from '@/store/authSlice';

export default function Navbar() {
  const { nome } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <span style={{ marginRight: '1rem' }}>
        {nome ? `Olá, ${nome}` : 'Bem-vindo(a)'}
      </span>

      {nome && (
        <Button onClick={() => dispatch(logout())} type="primary" danger>
          Logout
        </Button>
      )}
    </nav>
  );
}
