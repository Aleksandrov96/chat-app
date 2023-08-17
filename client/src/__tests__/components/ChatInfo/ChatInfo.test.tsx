import React from 'react';
import ChatInfo from 'components/ChatInfo/ChatInfo';
import { render, waitFor, screen } from 'setupTests';
import { StoresContext } from 'context/StoresContext';
import ChatStore from 'stores/chatStore';
import AuthStore from 'stores/authStore';
import { currentChatroomMock } from '__mocks__/chat-mocks';

describe('ChatInfo', () => {
  it('should render correctly', async () => {
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    chatStore.showChatInfo = true;

    render(
      <StoresContext.Provider value={{ chatStore, authStore }}>
        <ChatInfo />
      </StoresContext.Provider>,
    );

    const receiver = chatStore.currentChatroom.participants
      .find((part) => part._id !== authStore.user._id);

    await waitFor(() => {
      expect(screen.queryByText(receiver?.email as string)).toBeInTheDocument();
      expect(screen.queryByAltText('Avatar')).toHaveAttribute('src', receiver?.picture);
    });
  });
});
