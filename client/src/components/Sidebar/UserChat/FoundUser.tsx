import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { IUser } from 'interfaces/IUser';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'hooks/useTheme';
import './userChat.scss';

type Props = {
  user: IUser,
};

function FoundUser({ user }: Props) {
  const { authStore, chatStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();

  const handleChatClick = async (): Promise<void> => {
    await chatStore?.accessChatroom(authStore?.user._id as string, user._id);
    await chatStore?.fetchChatMessages(chatStore.currentChatroom._id);
    chatStore?.setSearchValue('');
  };

  return (
    <div
      className={onThemeChange('userChat')}
      key={user._id}
      aria-hidden="true"
      onClick={handleChatClick}
      data-testid="found-user"
    >
      <div className={onThemeChange('userInfo')}>
        <img src={user.picture} className={onThemeChange('userInfo__avatar')} alt="Avatar" />
        <p className={onThemeChange('userInfo__name')}>{user.email}</p>
      </div>
    </div>
  );
}

export default observer(FoundUser);
