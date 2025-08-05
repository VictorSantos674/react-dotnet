import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  nome: string;
  email?: string;
  exp?: number;
  [key: string]: any;
}

export default function Perfil() {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) return <p>Você precisa estar logado para ver o perfil.</p>;

  const decoded = jwtDecode<JwtPayload>(token);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Perfil do Usuário</h2>
      <p><strong>Nome:</strong> {decoded.nome}</p>
      {decoded.email && <p><strong>Email:</strong> {decoded.email}</p>}
    </div>
  );
}
