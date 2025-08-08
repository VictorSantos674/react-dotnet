import { Layout, Menu, Switch, Space, Typography, theme } from 'antd';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  BarChartOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, logout } from '@/store/authSlice';
import { selectIsAuthenticated, useAppSelector } from '@/store/authSlice';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function MainLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { label: <Link to="/"><HomeOutlined /> Home</Link>, key: '/' },
    { label: <Link to="/dashboard"><BarChartOutlined /> Dashboard</Link>, key: '/dashboard' },
    { label: <Link to="/produtos"><ShoppingCartOutlined /> Produtos</Link>, key: '/produtos' },
    { label: <Link to="/produtos/pesquisa"><SearchOutlined /> Pesquisar</Link>, key: '/produtos/pesquisa' },
    ...(isAuthenticated
      ? [
          { label: <Link to="/perfil"><UserOutlined /> Perfil</Link>, key: '/perfil' },
          { label: <span onClick={handleLogout}><LogoutOutlined /> Sair</span>, key: 'logout' }
        ]
      : [
          { label: <Link to="/cadastro">Cadastro</Link>, key: '/cadastro' },
          { label: <Link to="/login">Login</Link>, key: '/login' }
        ]
    )
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Title level={4} style={{ color: '#fff', margin: 0 }}>Meu App</Title>
          <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ borderBottom: 'none' }}
          />
        </div>
        <Space>
          <Switch
            checkedChildren="🌙"
            unCheckedChildren="☀️"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
        </Space>
      </Header>

      <Content style={{
        padding: '2rem',
        background: colorBgContainer,
        minHeight: 'calc(100vh - 64px - 70px)'
      }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Meu App Moderno
      </Footer>
    </Layout>
  );
}
