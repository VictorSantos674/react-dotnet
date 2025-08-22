import { notification } from 'antd';
import type { ReactNode } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface ToastOptions {
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  description?: ReactNode;
}

export const useToast = () => {
  const showToast = (
    type: NotificationType,
    message: string,
    options: ToastOptions = {}
  ) => {
    const {
      duration = 3,
      placement = 'topRight',
      description
    } = options;

    notification[type]({
      message,
      description,
      duration,
      placement,
      style: {
        borderRadius: '8px',
        background: 'var(--color-card)',
        color: 'var(--color-text)',
      },
    });
  };

  const showSuccess = (message: string, options?: ToastOptions) =>
    showToast('success', message, options);

  const showError = (message: string, options?: ToastOptions) =>
    showToast('error', message, options);

  const showWarning = (message: string, options?: ToastOptions) =>
    showToast('warning', message, options);

  const showInfo = (message: string, options?: ToastOptions) =>
    showToast('info', message, options);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};