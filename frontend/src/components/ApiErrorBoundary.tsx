import type { ReactNode } from 'react';
import { Alert, Button } from 'antd';
import { useApiError } from '@/hooks/useApiError';

interface ApiErrorBoundaryProps {
  children: ReactNode;
  operation: string;
  onRetry?: () => void;
}

export const ApiErrorBoundary = ({ 
  children, 
  operation, 
  onRetry 
}: ApiErrorBoundaryProps) => {
  const { error, clearError } = useApiError();

  if (error) {
    return (
      <Alert
        type="error"
        message={`Erro ao ${operation}`}
        description={error.message}
        action={
          <Button 
            size="small" 
            danger 
            onClick={() => {
              clearError();
              onRetry?.();
            }}
          >
            Tentar Novamente
          </Button>
        }
      />
    );
  }

  return <>{children}</>;
};

export default ApiErrorBoundary;