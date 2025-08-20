import { Alert, Button } from 'antd';

interface ErrorDisplayProps {
  error?: Error;
  title?: string;
  message?: string;
  onRetry?: () => void;
  type?: 'alert' | 'fullPage';
}

export const ErrorDisplay = ({
  error,
  title = 'Algo deu errado',
  message = 'Ocorreu um erro inesperado.',
  onRetry,
  type = 'alert'
}: ErrorDisplayProps) => {
  if (type === 'fullPage') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        padding: '2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#ff4d4f', marginBottom: '1rem' }}>{title}</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>{message}</p>
          {onRetry && (
            <Button type="primary" onClick={onRetry}>
              Tentar Novamente
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Alert
      type="error"
      message={title}
      description={
        <div>
          <p>{message}</p>
          {error && (
            <details style={{ marginTop: '1rem', fontSize: '0.9em' }}>
              <summary>Detalhes do erro</summary>
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                {error.message}
              </pre>
            </details>
          )}
        </div>
      }
      action={
        onRetry && (
          <Button size="small" danger onClick={onRetry}>
            Tentar Novamente
          </Button>
        )
      }
      style={{ marginBottom: '1rem' }}
    />
  );
};

export default ErrorDisplay;