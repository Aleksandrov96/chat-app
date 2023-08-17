import React, { useContext } from 'react';
import { StoresContext } from 'context/StoresContext';
import Sidebar from 'components/Sidebar/Sidebar';
import Chat from 'components/Chat/Chat';
import ChatInfo from 'components/ChatInfo/ChatInfo';
import { ToasterContainer } from 'components/common/ToasterContainer/ToasterContainer';
import { observer } from 'mobx-react-lite';
import { IChatRoom } from 'interfaces/IChatRoom';
import { FormattedMessage } from 'react-intl';
import { useTheme } from 'hooks/useTheme';
import { ContextMenu } from './ContextMenu/ContextMenu';
import './chatPage.scss';

function ChatPage() {
  const { chatStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();

  return (
    <div className="chatPage">
      <Sidebar />
      {Object.entries(chatStore?.currentChatroom as IChatRoom).length > 0
        ? <Chat />
        : (
          <div className={onThemeChange('noChat')}>
            <p className="noChat__text">
              <FormattedMessage
                id="chatPage-no-chat-placeholder"
                values={{ placeholder: 'Select a chat to start messaging' }}
              />
            </p>
          </div>
        )}
      { chatStore?.showChatInfo && <ChatInfo /> }
      { chatStore?.showContextMenu && <ContextMenu /> }
      <ToasterContainer />
    </div>
  );
}

export default observer(ChatPage);
