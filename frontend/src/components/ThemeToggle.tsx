import { Switch } from 'antd';
import { BulbOutlined, MoonOutlined } from '@ant-design/icons';
import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, setIsDarkMode }) => {
  const handleToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light');
  };

  return (
    <Switch
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<BulbOutlined />}
      checked={isDarkMode}
      onChange={handleToggle}
      style={{ marginLeft: '1rem' }}
    />
  );
};

export default ThemeToggle;