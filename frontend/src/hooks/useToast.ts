import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const useToast = () => {
  const showToast = (
    type: NotificationType,
    message: string,
    description?: string,
    duration: number = 3
  ) => {
    notification[type]({
      message,
      description,
      duration,
      placement: 'topRight',
    });
  };

  const showSuccess = (message: string, description?: string) =>
    showToast('success', message, description);

  const showError = (message: string, description?: string) =>
    showToast('error', message, description);

  const showWarning = (message: string, description?: string) =>
    showToast('warning', message, description);

  const showInfo = (message: string, description?: string) =>
    showToast('info', message, description);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};