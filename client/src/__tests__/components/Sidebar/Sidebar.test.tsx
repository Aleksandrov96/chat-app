import React from 'react';
import Sidebar from 'components/Sidebar/Sidebar';
import { StoresContext } from 'context/StoresContext';
import ChatStore from 'stores/chatStore';
import { render, screen } from 'setupTests';
import { chatsMock } from '__mocks__/chat-mocks';

describe('Sidebar', () => {
  it('should render component correctly with list of chats', () => {
    const chatStore = new ChatStore();

    chatStore.chats = chatsMock;

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Sidebar />
      </StoresContext.Provider>,
    );

    expect(screen.queryByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'signOut-button' })).toBeInTheDocument();
    expect(screen.queryByAltText('User avatar')).toBeInTheDocument();
    expect(screen.queryAllByTestId('user-chat')).toHaveLength(2);
  });
});
