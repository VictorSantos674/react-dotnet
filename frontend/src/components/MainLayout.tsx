import { Layout, Menu, Switch } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    <Layout style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <Header className="app-header">
        <div className="logo">Meu App</div>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="app-menu"
        />

        <Switch
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
      </Header>

      <Content className="app-content">
        <Outlet />
      </Content>

      <Footer className="app-footer">
        © {new Date().getFullYear()} Meu App Moderno
      </Footer>
    </Layout>
  );
};

export default MainLayout;
