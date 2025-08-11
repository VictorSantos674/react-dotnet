import { Typography, Row, Col } from 'antd';
import {
  ShoppingOutlined,
  UserOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import Card from 'antd/es/card/Card'; 

const { Title } = Typography;

export default function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered style={{ textAlign: 'center' }}>
            <ShoppingOutlined style={{ fontSize: '32px', color: '#058ED9' }} />
            <p style={{ fontSize: '18px', margin: 0 }}>120 Produtos</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card bordered style={{ textAlign: 'center' }}>
            <UserOutlined style={{ fontSize: '32px', color: '#483D3F' }} />
            <p style={{ fontSize: '18px', margin: 0 }}>45 Usuários</p>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card bordered style={{ textAlign: 'center' }}>
            <BarChartOutlined style={{ fontSize: '32px', color: '#77685D' }} />
            <p style={{ fontSize: '18px', margin: 0 }}>R$ 15.000,00 no mês</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
