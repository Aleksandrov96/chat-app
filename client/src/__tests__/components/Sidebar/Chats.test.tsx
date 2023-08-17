/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { StoresContext } from 'context/StoresContext';
import ChatStore from 'stores/chatStore';
import { render, screen, waitFor } from 'setupTests';
import { chatsMock, userSearchResultsMock } from '__mocks__/chat-mocks';
import Chats from 'components/Sidebar/Chats/Chats';

describe('Chats', () => {
  it('should render current chats if user not searching', async () => {
    const chatStore = new ChatStore();

    chatStore.chats = chatsMock;

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Chats />
      </StoresContext.Provider>,
    );

    expect(screen.queryAllByTestId('user-chat')).toHaveLength(2);
  });

  it('should render search results if user searching', async () => {
    const chatStore = new ChatStore();

    chatStore.searchValue = 'ch';
    chatStore.userSearchResults = userSearchResultsMock;

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Chats />
      </StoresContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.queryAllByTestId('found-user')).toHaveLength(3);
    });
  });
});
