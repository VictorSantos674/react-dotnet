import { Skeleton, Row, Col } from 'antd';
import { withMemo } from '@/hooks/useMemoComponent';
import Card from 'antd/es/card/Card';

const ProductSkeleton = () => {
  return (
    <Card
      style={{
        marginBottom: 16,
        background: 'var(--color-card)',
        borderRadius: '12px',
      }}
      className="fade-in skeleton-pulse"
    >
      <Row gutter={16} align="middle">
        <Col span={16}>
          <Skeleton active paragraph={{ rows: 2 }} />
        </Col>
        <Col span={8}>
          <Skeleton.Button active size="small" style={{ width: '100%' }} />
        </Col>
      </Row>
    </Card>
  );
};

export const ProductListSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};

export default withMemo(ProductSkeleton) && ProductSkeleton;