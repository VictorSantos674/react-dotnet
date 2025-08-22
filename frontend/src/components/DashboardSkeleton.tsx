import { Skeleton, Row, Col } from 'antd';
import Card from 'antd/es/card/Card';

export const DashboardSkeleton = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        </Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardSkeleton;