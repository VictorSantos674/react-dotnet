import { Layout, Menu, Switch } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const colors = {
    primary: '#058ED9',
    darkBg: '#483D3F',
    lightBg: '#F4EBD9',
    neutral: '#A39A92',
    accent: '#77685D',
  };

  const menuItems = [
    { label: <Link to="/home">Home</Link>, key: '/home' },
    { label: <Link to="/produtos">Produtos</Link>, key: '/produtos' },
    { label: <Link to="/cadastro">Cadastro</Link>, key: '/cadastro' },
    { label: <Link to="/login">Login</Link>, key: '/login' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: isDarkMode ? colors.darkBg : colors.primary,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          padding: '0 2rem',
          height: '64px',
        }}
      >
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', marginRight: '2rem' }}>
          Meu App
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, background: 'transparent' }}
        />

        <Switch
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
      </Header>

      <Content
        style={{
          flex: 1,
          padding: '2rem',
          paddingTop: '6rem',
          background: isDarkMode ? colors.darkBg : colors.lightBg,
          color: isDarkMode ? colors.lightBg : colors.darkBg,
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          background: isDarkMode ? colors.accent : colors.neutral,
          color: '#fff',
          marginTop: 'auto',
        }}
      >
        © {new Date().getFullYear()} Meu App Moderno
      </Footer>
    </Layout>
  );
};

export default MainLayout;
