/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { StoresContext } from 'context/StoresContext';
import AuthStore from 'stores/authStore';
import ChatStore from 'stores/chatStore';
import { render, screen, waitFor } from 'setupTests';
import FoundUser from 'components/Sidebar/UserChat/FoundUser';
import { userSearchResultsMock } from '__mocks__/chat-mocks';
import { currentUserMock } from '__mocks__/auth-mocks';
import userEvent from '@testing-library/user-event';

const user = userSearchResultsMock[0];

describe('FoundUser', () => {
  it('should render correctly', () => {
    render(
      <FoundUser user={user} />,
    );

    expect(screen.queryByText(user.email)).toBeInTheDocument();
    expect(screen.queryByAltText('Avatar')).toHaveAttribute('src', user.picture);
  });

  it('should call accessChatroom and fetchChatMessages actions when click on chat', async () => {
    const authStore = new AuthStore();
    const chatStore = new ChatStore();

    authStore.user = currentUserMock;

    chatStore.accessChatroom = jest.fn();
    chatStore.fetchChatMessages = jest.fn();

    render(
      <StoresContext.Provider value={{ authStore, chatStore }}>
        <FoundUser user={user} />
      </StoresContext.Provider>,
    );

    const userChat = screen.queryByTestId('found-user') as HTMLElement;

    userEvent.click(userChat);

    await waitFor(() => {
      expect(chatStore.accessChatroom).toHaveBeenCalledWith(authStore.user._id, user._id);
      expect(chatStore.fetchChatMessages).toHaveBeenCalledWith(chatStore.currentChatroom._id);
    });
  });
});
