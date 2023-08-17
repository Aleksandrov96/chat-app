/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from 'setupTests';
import Messages from 'components/Chat/Messages/Messages';
import { StoresContext } from 'context/StoresContext';
import ChatStore from 'stores/chatStore';
import {
  currentChatMessagesMock,
  currentChatMessagesWithUnviewedMock,
  currentChatroomMock,
  unviewedMessagesMock,
} from '__mocks__/chat-mocks';
import { mockIntersectionObserver } from '__mocks__/helpers/mockIntersectionObserver';

beforeEach(() => {
  mockIntersectionObserver();
});

describe('Messages', () => {
  it('should render messages content', async () => {
    const chatStore = new ChatStore();

    chatStore.currentChatMessages = currentChatMessagesMock;

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Messages />
      </StoresContext.Provider>,
    );

    chatStore.currentChatMessages.forEach((message) => {
      const dateTimeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });
      const formattedDate = dateTimeFormat.format(new Date(message.createdAt));

      expect(screen.queryByText(message.content)).toBeInTheDocument();
      expect(screen.queryByText(formattedDate)).toBeInTheDocument();
    });
    expect(screen.queryAllByAltText('Avatar')).toBeTruthy();
  });

  it('should scroll to last message if no unviewed messages', async () => {
    const chatStore = new ChatStore();

    chatStore.currentChatMessages = currentChatMessagesMock;

    const scrollIntoViewMock = jest.fn();
    HTMLDivElement.prototype.scrollIntoView = scrollIntoViewMock;

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Messages />
      </StoresContext.Provider>,
    );

    const messages = screen.queryAllByTestId('message');

    await waitFor(() => {
      expect(messages[messages.length - 1].scrollIntoView).toBeCalled();
    });
  });

  it('should scroll to first unviewed message and add dividing line', async () => {
    const chatStore = new ChatStore();

    chatStore.currentChatroom = currentChatroomMock;
    chatStore.currentChatMessages = currentChatMessagesWithUnviewedMock;
    chatStore.unviewedMessages = unviewedMessagesMock;

    const scrollIntoViewMock = jest.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Messages />
      </StoresContext.Provider>,
    );

    const unviewedMessages = chatStore?.unviewedMessages.filter(
      (message) => message.chatroom._id === chatStore.currentChatroom._id,
    );

    const messages = screen.queryAllByTestId('message');

    const firstUnviewedMessage = messages
      .find((message) => message.getAttribute('data-message-id') === unviewedMessages[0]._id);

    await waitFor(() => {
      if (firstUnviewedMessage) {
        expect(firstUnviewedMessage.scrollIntoView).toBeCalled();
        expect(firstUnviewedMessage.classList).toBe('unviewed');
      }
    });
  });

  it('should start lazy loading', async () => {
    const chatStore = new ChatStore();

    chatStore.currentChatMessages = currentChatMessagesMock;
    chatStore.fetchChatMessages = jest.fn();

    const scrollIntoViewMock = jest.fn();
    HTMLDivElement.prototype.scrollIntoView = scrollIntoViewMock;

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Messages />
      </StoresContext.Provider>,
    );

    const messages = screen.queryAllByTestId('message');
    const messagesContainer = screen.queryByTestId('messages-container') as HTMLElement;

    await waitFor(() => {
      fireEvent.scroll(messagesContainer, { target: { scrollY: 0 } });
    });

    await waitFor(() => {
      expect(chatStore.fetchChatMessages).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeInTheDocument();
    });

    expect(messages[messages.length - 1].scrollIntoView).toBeCalled();
  });
});
