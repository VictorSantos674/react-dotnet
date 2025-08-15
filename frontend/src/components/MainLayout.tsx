import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const menuItems = [
    { label: <Link to="/home">Home</Link>, key: '/home' },
    { label: <Link to="/produtos">Produtos</Link>, key: '/produtos' },
    { label: <Link to="/cadastro">Cadastro</Link>, key: '/cadastro' },
    { label: <Link to="/login">Login</Link>, key: '/login' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--color-primary)',
          padding: '0 1.5rem',
          height: '64px',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
        }}
      >
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '20px', marginRight: '2rem' }}>
          Meu App
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            flex: 1,
            background: 'transparent',
            borderBottom: 'none',
            display: 'flex',
            justifyContent: 'center',
          }}
        />

        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </Header>

      <Content
        style={{
          flex: 1,
          padding: '2rem',
          paddingTop: '6rem',
          background: 'var(--color-background)',
          color: 'var(--color-text)',
          minHeight: 'calc(100vh - 64px - 64px)',
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          background: 'var(--color-primary)',
          color: '#fff',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        © {new Date().getFullYear()} Meu App Moderno
      </Footer>
    </Layout>
  );
};

export default MainLayout;
