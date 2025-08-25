import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'
import { ConfigProvider, theme as antdTheme } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: '#058ED9',
            colorBgBase: '#F4EBD9',
            colorTextBase: '#483D3F',
            colorTextSecondary: '#A39A92',
            colorBorder: '#A39A92',
            borderRadius: 8,
            fontFamily: 'Inter, sans-serif',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
