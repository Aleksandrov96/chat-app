import React from 'react';
import ChatStore from 'stores/chatStore';
import { StoresContext } from 'context/StoresContext';
import ChatPage from 'pages/ChatPage/ChatPage';
import { currentChatroomMock } from '__mocks__/chat-mocks';
import { mockIntersectionObserver } from '__mocks__/helpers/mockIntersectionObserver';
import { render, screen, waitFor } from 'setupTests';
import { IChatRoom } from 'interfaces/IChatRoom';

beforeEach(() => {
  mockIntersectionObserver();
});

describe('ChatPage', () => {
  it('should render Chat component when chat is selected', async () => {
    const chatStore = new ChatStore();

    chatStore.currentChatroom = currentChatroomMock;

    const { asFragment } = render(
      <StoresContext.Provider value={{ chatStore }}>
        <ChatPage />
      </StoresContext.Provider>,
    );

    expect(screen.queryByTestId('chat')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render dummy div when chat is not selected', async () => {
    const chatStore = new ChatStore();

    chatStore.currentChatroom = {} as IChatRoom;

    const { container, asFragment } = render(
      <StoresContext.Provider value={{ chatStore }}>
        <ChatPage />
      </StoresContext.Provider>,
    );

    expect(container.innerHTML).toMatch('Select a chat to start messaging');

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render custom context menu', async () => {
    const chatStore = new ChatStore();

    chatStore.showContextMenu = true;

    const { container } = render(
      <StoresContext.Provider value={{ chatStore }}>
        <ChatPage />
      </StoresContext.Provider>,
    );

    await waitFor(async () => {
      expect(container.innerHTML).toMatch('Delete chat');
    });
  });
});
