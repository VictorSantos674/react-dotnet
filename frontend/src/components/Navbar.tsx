import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { Menu, Dropdown, Avatar, Layout, Typography } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '@/store/authSlice';

const { Header } = Layout;
const { Text } = Typography;

export default function Navbar() {
  const { nome } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item icon={<LogoutOutlined />} onClick={() => dispatch(logout())}>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '0 1rem', boxShadow: '0 2px 8px #f0f1f2' }}>
      <Text strong style={{ fontSize: '1.2rem' }}>Sistema de Produtos</Text>
      {nome && (
        <Dropdown overlay={menu} placement="bottomRight">
          <span style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
            {nome}
          </span>
        </Dropdown>
      )}
    </Header>
  );
}
