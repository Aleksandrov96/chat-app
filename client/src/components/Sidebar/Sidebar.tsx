import React from 'react';
import SidebarHeader from 'components/Sidebar/SidebarHeader/SidebarHeader';
import Chats from 'components/Sidebar/Chats/Chats';
import { useTheme } from 'hooks/useTheme';
import { observer } from 'mobx-react-lite';
import Search from './Search/Search';
import './sidebar.scss';

function Sidebar() {
  const { onThemeChange } = useTheme();
  return (
    <div className={onThemeChange('sidebar')} data-testid="sidebar">
      <SidebarHeader />
      <Search />
      <Chats />
    </div>
  );
}

export default observer(Sidebar);
