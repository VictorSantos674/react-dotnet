import { Skeleton, Space } from 'antd';
import Card from 'antd/es/card/Card';

export const ProductSkeleton = () => {
  return (
    <Card
      className="fade-in skeleton-pulse"
      style={{
        marginBottom: 16,
        background: 'var(--color-card)',
        borderRadius: '12px',
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Skeleton active paragraph={{ rows: 0 }} />
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton.Button active size="default" />
      </Space>
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

export default ProductSkeleton;