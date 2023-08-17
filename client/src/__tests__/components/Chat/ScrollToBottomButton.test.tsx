import React from 'react';
import { StoresContext } from 'context/StoresContext';
import ChatStore from 'stores/chatStore';
import { render, screen } from 'setupTests';
import Messages from 'components/Chat/Messages/Messages';
import { currentChatroomMock } from '__mocks__/chat-mocks';

describe('ScrollToBottomButton', () => {
  it('should not render button if container has no scrollbar', () => {
    const chatStore = new ChatStore();

    chatStore.currentChatroom = currentChatroomMock;
    chatStore.currentChatMessages = [];

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Messages />
      </StoresContext.Provider>,
    );

    expect(screen.queryByTestId('messages-container')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'scroll-to-bottom' })).not.toBeInTheDocument();
  });
});
