import React, { useContext } from 'react';
import Messages from 'components/Chat/Messages/Messages';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { useReceiver } from 'hooks/useReceiver';
import { IUser } from 'interfaces/IUser';
import { useTheme } from 'hooks/useTheme';
import { TypingIndicator } from '../common/TypingIndicator/TypingIndicator';
import MessageInput from './MessageInput/MessageInput';
import ShowChatInfoButton from '../common/Buttons/ShowChatInfoButton';
import './chat.scss';

function Chat() {
  const { chatStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();
  const { receiver } = useReceiver(chatStore?.currentChatroom.participants as IUser[]);

  const showChatInfo = (): void => {
    chatStore?.setShowChatInfo();
  };

  return (
    <div className={onThemeChange('chat')} data-testid="chat">
      <div className={onThemeChange('chatInfo')}>
        <div className="wrapper">
          <p className={onThemeChange('chatInfo__name')}>{receiver?.email}</p>
          <div className="typing">
            {chatStore?.currentChatroom?.isTyping && <TypingIndicator />}
          </div>
        </div>
        <ShowChatInfoButton showChatInfo={showChatInfo} />
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
}

export default observer(Chat);
