import { Descriptions, Typography, } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Card from 'antd/es/card/Card';

const { Title } = Typography;

interface ExtendedAuthState {
  nome?: string;
  email?: string;
}

export default function Perfil() {
  const authState = useSelector((state: RootState) => state.auth);
  const { nome, email } = authState as ExtendedAuthState;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        }}
      >
        <Title level={3} style={{ color: 'var(--color-primary)' }}>
          Perfil do Usuário
        </Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Nome">{nome || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Email">{email || 'N/A'}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}