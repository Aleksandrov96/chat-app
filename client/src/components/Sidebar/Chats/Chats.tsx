import React, { useContext, useEffect } from 'react';
import { StoresContext } from 'context/StoresContext';
import { toJS } from 'mobx';
import { setToastError } from 'utils/setToastError';
import { observer } from 'mobx-react-lite';
import { IUser } from 'interfaces/IUser';
import { useTheme } from 'hooks/useTheme';
import FoundUser from '../UserChat/FoundUser';
import UserChat from '../UserChat/UserChat';
import './chats.scss';

function Chats() {
  const { authStore, chatStore } = useContext(StoresContext);
  const { onThemeChange } = useTheme();

  useEffect(() => {
    if (authStore?.isAuth) {
      const fetchChats = async () => {
        await chatStore?.fetchChats();
      };
      fetchChats()
        .catch((error: Error) => setToastError(error.message));
    }
  }, [chatStore?.currentChatMessages]);

  useEffect(() => {
    if (authStore?.isAuth) {
      const fetchUnviewedMessages = async () => {
        await chatStore?.fetchUnviewedMessages();
      };
      fetchUnviewedMessages()
        .catch((error: Error) => setToastError(error.message));
    }
  }, [chatStore?.currentChatMessages]);

  return (
    <div className={onThemeChange('chats')} data-testid="chats">
      {
        chatStore?.searchValue.length === 0
          ? toJS(chatStore.chats).map((chat) => (
            <UserChat
              key={chat._id}
              chat={chat}
            />
          ))
          : toJS(chatStore?.userSearchResults as IUser[]).map((user) => (
            <FoundUser
              user={user}
              key={user._id}
            />
          ))
      }
    </div>
  );
}

export default observer(Chats);
