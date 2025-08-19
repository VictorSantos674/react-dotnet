import { useState, useCallback } from 'react';
import { message } from 'antd';
import type { ApiError } from '@/types/User';

export const useApiError = () => {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = useCallback((err: any) => {
    const apiError: ApiError = {
      message: err.data?.message || 'Erro interno do servidor',
      error: err.data?.error,
      statusCode: err.status,
    };

    setError(apiError);
    message.error(apiError.message);

    return apiError;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};