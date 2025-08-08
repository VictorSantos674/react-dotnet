import { useAppSelector } from '@/store/authSlice';
import { selectIsAuthenticated } from '@/store/authSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { useEffect } from 'react';

export default function RequireAuth() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      message.warning('Faça login para acessar esta página.');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
