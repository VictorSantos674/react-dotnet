import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', color: '#ff4d4f', marginBottom: '1rem' }}>
            ⚠️ Oops! Algo deu errado.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
            Desculpe pelo inconveniente. Por favor, tente recarregar a página.
          </p>
          <Button 
            type="primary" 
            size="large"
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
            }}
          >
            Recarregar Página
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;