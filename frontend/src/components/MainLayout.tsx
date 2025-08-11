// src/components/MainLayout.tsx
import { Layout, Menu, Switch } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: <Link to="/">Home</Link>, key: '/' },
    { label: <Link to="/produtos">Produtos</Link>, key: '/produtos' },
    { label: <Link to="/cadastro">Cadastro</Link>, key: '/cadastro' },
    { label: <Link to="/login">Login</Link>, key: '/login' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        background: isDarkMode ? '#483D3F' : '#058ED9'
      }}>
        <div style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '18px',
          marginRight: '2rem'
        }}>
          Meu App
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1 }}
        />

        <Switch
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
      </Header>

      <Content style={{
        padding: '2rem',
        background: isDarkMode ? '#483D3F' : '#F4EBD9',
        color: isDarkMode ? '#F4EBD9' : '#483D3F'
      }}>
        <Outlet />
      </Content>

      <Footer style={{
        textAlign: 'center',
        background: isDarkMode ? '#77685D' : '#A39A92',
        color: '#fff'
      }}>
        © {new Date().getFullYear()} Meu App Moderno
      </Footer>
    </Layout>
  );
};

export default MainLayout;
