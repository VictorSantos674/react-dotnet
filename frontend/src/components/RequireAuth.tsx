// frontend/src/components/RequireAuth.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '@/store';
import { useToast } from '@/hooks/useToast';
import { useEffect } from 'react';

export default function RequireAuth() {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();
  const { showWarning } = useToast();

  useEffect(() => {
    if (!token) {
      showWarning('Faça login para acessar esta página.');
    }
  }, [token, showWarning]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}