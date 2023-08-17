/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { StoresContext } from 'context/StoresContext';
import AuthStore from 'stores/authStore';
import ChatStore from 'stores/chatStore';
import {
  render, screen, waitFor, prettyDOM,
} from 'setupTests';
import {
  chatsMock,
  chatWithoutLatestMessageMock,
  messageMock,
  unviewedMessagesMock,
} from '__mocks__/chat-mocks';
import { currentUserMock } from '__mocks__/auth-mocks';
import UserChat from 'components/Sidebar/UserChat/UserChat';
import userEvent from '@testing-library/user-event';
import { IChatRoom } from 'interfaces/IChatRoom';
import { mockIntersectionObserver } from '__mocks__/helpers/mockIntersectionObserver';

type Props = {
  authStore?: AuthStore,
  chatStore?: ChatStore,
  chat: IChatRoom,
};

const renderComponent = (props: Props): void => {
  const { authStore, chatStore, chat } = props;
  render(
    <StoresContext.Provider value={{ authStore, chatStore }}>
      <UserChat chat={chat} />
    </StoresContext.Provider>,
  );
};

beforeEach(() => {
  mockIntersectionObserver();
});

describe('UserChat', () => {
  it('should render correctly if chat without messages', () => {
    const authStore = new AuthStore();

    authStore.user = currentUserMock;

    const chat = chatWithoutLatestMessageMock;

    renderComponent({ chat, authStore });

    const receiver = chat.participants
      .find((part) => part.email !== authStore.user.email);

    expect(screen.queryByText(receiver?.email as string)).toBeInTheDocument();
    expect(screen.queryByAltText('Avatar')).toHaveAttribute('src', receiver?.picture);
  });

  it('should render correctly if chat contains latestMessage', () => {
    const authStore = new AuthStore();

    authStore.user = currentUserMock;

    const chat = chatsMock[0];

    renderComponent({ chat, authStore });

    const receiver = chat.participants
      .find((part) => part.email !== authStore.user.email);

    expect(screen.queryByText(receiver?.email as string)).toBeInTheDocument();
    expect(screen.queryByAltText('Avatar')).toHaveAttribute('src', receiver?.picture);
  });

  it('should render TypingIndicator if isTyping true', () => {
    const chat = chatsMock[0];

    chat.isTyping = true;

    render(<UserChat chat={chat} />);

    expect(screen.queryByTestId('typing-indicator')).toBeInTheDocument();
  });

  it('should render socket message data', async () => {
    const chatStore = new ChatStore();

    const chat = chatsMock[0];
    chat.isTyping = false;
    chatStore.receivedMessage = messageMock;

    renderComponent({ chat, chatStore });

    await waitFor(() => {
      expect(screen.queryByText(chatStore.receivedMessage.content)).toBeInTheDocument();
    });
  });

  it('should call accessChatroom and fetchChatMessages actions when click on chat', async () => {
    const authStore = new AuthStore();
    const chatStore = new ChatStore();

    authStore.user = currentUserMock;

    chatStore.accessChatroom = jest.fn();
    chatStore.fetchChatMessages = jest.fn();

    const chat = chatsMock[0];

    renderComponent({ chat, authStore, chatStore });

    const receiver = chat.participants
      .find((part) => part._id !== authStore.user._id);

    const userChat = screen.queryByTestId('user-chat') as HTMLElement;

    userEvent.click(userChat);

    await waitFor(() => {
      expect(chatStore.accessChatroom).toHaveBeenCalledWith(authStore.user._id, receiver?._id);
      expect(chatStore.fetchChatMessages).toHaveBeenCalledWith(chatStore.currentChatroom._id);
    });
  });

  it('should render unviewed messages count div', async () => {
    const chatStore = new ChatStore();

    chatStore.unviewedMessages = unviewedMessagesMock;

    const chat = chatsMock[0];

    renderComponent({ chat, chatStore });

    const unviewedMessages = chatStore?.unviewedMessages.filter(
      (message) => message.chatroom._id === chat._id,
    );

    expect(screen.queryByTestId('unviewed-count')).toBeInTheDocument();
    expect(screen.queryByText(unviewedMessages.length)).toBeInTheDocument();
  });

  it('should not render unviewed messages count div', async () => {
    const chatStore = new ChatStore();

    const chat = chatsMock[0];

    renderComponent({ chat, chatStore });

    expect(screen.queryByTestId('unviewed-count')).not.toBeInTheDocument();
  });
});
