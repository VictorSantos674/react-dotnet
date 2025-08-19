import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ 
  size = 'large', 
  tip = 'Carregando...', 
  fullScreen = false 
}: LoadingSpinnerProps) => {
  const spinner = (
    <Spin 
      size={size} 
      tip={tip}
      indicator={<LoadingOutlined spin />}
    />
  );

  if (fullScreen) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;