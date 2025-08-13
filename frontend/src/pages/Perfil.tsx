import { Descriptions, Typography } from 'antd';
import Card from 'antd/es/card/Card';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const { Title } = Typography;

export default function Perfil() {
  const { nome, email } = useSelector((state: RootState) => state.auth);

  return (
    <div style={{ padding: '2rem' }}>
      <Card
        bordered={false}
        style={{
          background: 'var(--color-card)',
          borderRadius: '12px',
          padding: '1.5rem',
        }}
      >
        <Title level={3} style={{ color: 'var(--color-text)' }}>
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