import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { SocketService } from 'services/socket-service';
import LangSwitcher from 'components/common/LangSwitcher/LangSwitcher';
import SignOutButton from 'components/common/Buttons/SignOutButton';
import { useTheme } from 'hooks/useTheme';
import ThemeSwitcher from 'components/common/ThemeSwitcher/ThemeSwitcher';
import './sidebarHeader.scss';

function SidebarHeader() {
  const { authStore, socketStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();
  const navigate = useNavigate();

  const signOut = async (): Promise<void> => {
    await authStore?.signOut()
      .then(() => {
        navigate('/sign-in');
        socketStore?.socket && SocketService.disconnectSocket(socketStore);
      });
  };

  return (
    <div className={onThemeChange('sidebarHeader')}>
      <div className={onThemeChange('user')}>
        <img
          src={authStore?.user.picture}
          alt="User avatar"
          className={onThemeChange('user__avatar')}
        />
        <p className={onThemeChange('user__name')}>{authStore?.user.email}</p>
      </div>
      <div className="wrapper">
        <ThemeSwitcher />
        <LangSwitcher />
        <SignOutButton signOut={signOut} />
      </div>
    </div>
  );
}

export default observer(SidebarHeader);
