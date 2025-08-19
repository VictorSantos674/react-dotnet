import { useAppSelector, useAppDispatch } from './redux';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '@/services/api/endpoints/authApi';
import type { LoginRequest, RegisterRequest } from '@/types/User';
import { useApiError } from './useApiError';
import { message } from 'antd';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { handleError } = useApiError();
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);

  const login = async (credentials: LoginRequest) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      message.success('Login realizado com sucesso!');
      return result;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const result = await registerMutation(userData).unwrap();
      message.success('Cadastro realizado com sucesso!');
      return result;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      message.success('Logout realizado com sucesso!');
    } catch (error) {
      handleError(error);
    }
  };

  return {
    isAuthenticated,
    user,
    token,
    login,
    register,
    logout,
  };
};