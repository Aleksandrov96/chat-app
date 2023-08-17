import React from 'react';
import { StoresContext } from 'context/StoresContext';
import AuthStore from 'stores/authStore';
import ChatStore from 'stores/chatStore';
import { mockIntersectionObserver } from '__mocks__/helpers/mockIntersectionObserver';
import { currentChatroomMock, currentChatMessagesMock } from '__mocks__/chat-mocks';
import { currentUserMock } from '__mocks__/auth-mocks';
import { render, screen, waitFor } from 'setupTests';
import Chat from 'components/Chat/Chat';

beforeEach(() => {
  mockIntersectionObserver();
});

describe('Chat', () => {
  it('should render correctly', () => {
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    authStore.user = currentUserMock;
    chatStore.currentChatroom = currentChatroomMock;
    chatStore.currentChatMessages = currentChatMessagesMock;

    const receiver = chatStore.currentChatroom?.participants
      .find((part) => part.email !== authStore.user.email);

    render(
      <StoresContext.Provider value={{ chatStore, authStore }}>
        <Chat />
      </StoresContext.Provider>,
    );

    expect(screen.queryByText(receiver?.email as string)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Write a message...')).toBeInTheDocument();
    expect(screen.queryAllByTestId('message')).toHaveLength(2);
  });

  it('should render TypingIndicator', async () => {
    const chatStore = new ChatStore();

    chatStore.currentChatroom = currentChatroomMock;
    chatStore.currentChatroom.isTyping = true;

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Chat />
      </StoresContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('typing-indicator')).toBeInTheDocument();
    });
  });
});
