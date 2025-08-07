import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { useTokenExpiration } from '@/hooks/useTokenExpiration';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Suspense } from 'react';

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 48 }} spin />);

function App() {
  useTokenExpiration();

  return (
    <Suspense fallback={<Spin fullscreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
