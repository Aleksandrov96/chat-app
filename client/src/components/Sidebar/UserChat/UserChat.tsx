/* eslint-disable max-len */
import React, { useContext, useRef } from 'react';
import { StoresContext } from 'context/StoresContext';
import { observer } from 'mobx-react-lite';
import { IChatRoom } from 'interfaces/IChatRoom';
import { useReceiver } from 'hooks/useReceiver';
import { TypingIndicator } from 'components/common/TypingIndicator/TypingIndicator';
import { useUnviewedMessages } from 'hooks/useUnviewedMessages';
import { useCloseContextMenu } from 'hooks/useCloseContextMenu';
import { FormattedTime } from 'react-intl';
import { useTheme } from 'hooks/useTheme';
import './userChat.scss';

type Props = {
  chat: IChatRoom;
};

function UserChat({ chat }: Props) {
  const { authStore, chatStore } = useContext(StoresContext);
  const { chatUnviewedMessages } = useUnviewedMessages(chat._id);
  const { participants, latestMessage } = chat;
  const { receiver } = useReceiver(participants);
  const { onThemeChange } = useTheme();
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useCloseContextMenu(contextMenuRef);

  const handleChatClick = async (): Promise<void> => {
    await chatStore?.accessChatroom(authStore?.user._id as string, receiver?._id as string);
    await chatStore?.fetchChatMessages(chatStore.currentChatroom._id);
  };

  const displayLatestMessage = (): string | undefined => {
    if (chatStore?.receivedMessage._id && chatStore?.receivedMessage.chatroom._id === chat._id) {
      return chatStore.receivedMessage.content;
    } return latestMessage?.content;
  };

  const displayLatestMessageTime = (): string | undefined => {
    if (chatStore?.receivedMessage._id && chatStore?.receivedMessage.chatroom._id === chat._id) {
      return chatStore?.receivedMessage.updatedAt;
    } return latestMessage?.updatedAt;
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    chatStore?.setAnchorPoint(e.pageX, e.pageY);
    chatStore?.setShowContextMenu(!chatStore?.showContextMenu);
  };

  return (
    <div
      className={onThemeChange(chatStore?.currentChatroom._id === chat._id ? 'userChat active' : 'userChat')}
      aria-hidden="true"
      onClick={handleChatClick}
      data-chat-id={chat._id}
      onContextMenu={handleContextMenu}
      ref={contextMenuRef}
      data-testid="user-chat"
    >
      <div className={onThemeChange('userInfo')}>
        <img src={receiver?.picture} className={onThemeChange('userInfo__avatar')} alt="Avatar" />
        <div className="userInfo__wrapper">
          <p className={onThemeChange('userInfo__wrapper-name')}>{receiver?.email}</p>
          <div className={onThemeChange('userInfo__wrapper-latestMessage')}>
            {chat.isTyping ? <TypingIndicator /> : displayLatestMessage()}
          </div>
        </div>
      </div>
      <div className="messageInfo">
        <p
          className={onThemeChange('messageInfo__time')}
        >
          {displayLatestMessageTime() ? <FormattedTime value={displayLatestMessageTime()} /> : ''}
        </p>
        {
          chatUnviewedMessages?.length === 0
            ? null
            : (
              <p
                className="messageInfo__count"
                data-testid="unviewed-count"
              >
                {chatUnviewedMessages?.length}
              </p>
            )
        }
      </div>
    </div>
  );
}

export default observer(UserChat);
