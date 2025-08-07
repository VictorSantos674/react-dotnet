import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode'; 
import { logout } from '@/store/authSlice'; 
import type { RootState } from '@/store';

interface DecodedToken {
  exp: number;
}

export function useTokenExpiration() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const decoded = jwtDecode<DecodedToken>(token);
    const expirationTime = decoded.exp * 1000;
    const now = Date.now();

    if (expirationTime < now) {
      dispatch(logout());
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(logout());
    }, expirationTime - now);

    return () => clearTimeout(timeout);
  }, [token, dispatch]);
}
