import { Layout, Menu, theme, Switch, Space, Typography } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  const menuItems = [
    { label: <Link to="/">Home</Link>, key: '/' },
    { label: <Link to="/produtos">Produtos</Link>, key: '/produtos' },
    { label: <Link to="/cadastro">Cadastro</Link>, key: '/cadastro' },
    { label: <Link to="/login">Login</Link>, key: '/login' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', marginRight: '2rem' }}>
          Meu App
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Header>

      <Content style={{ padding: '2rem', background: colorBgContainer }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>© {new Date().getFullYear()} Meu App Moderno</Footer>
    </Layout>
  );
};

export default MainLayout;
