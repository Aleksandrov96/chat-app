import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { useReceiver } from 'hooks/useReceiver';
import { IUser } from 'interfaces/IUser';
import CloseChatInfoButton from 'components/common/Buttons/CloseChatInfoButton';
import { useTheme } from 'hooks/useTheme';
import './chatInfo.scss';

function ChatInfo() {
  const { chatStore } = useContext(StoresContext);
  const { receiver } = useReceiver(chatStore?.currentChatroom.participants as IUser[]);
  const { onThemeChange } = useTheme();

  const closeChatInfo = (): void => {
    chatStore?.setShowChatInfo();
  };

  return (
    <div className={onThemeChange('info')}>
      <div className={onThemeChange('info__header')}>
        <CloseChatInfoButton closeChatInfo={closeChatInfo} />
      </div>
      <div className="profile">
        <img
          src={receiver?.picture}
          alt="Avatar"
          className={onThemeChange('profile__avatar')}
        />
        <p className={onThemeChange('profile__name')}>{receiver?.email}</p>
      </div>
    </div>
  );
}

export default observer(ChatInfo);
