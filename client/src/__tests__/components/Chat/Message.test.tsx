import React from 'react';
import Message from 'components/Chat/Messages/Message';
import { render, screen } from 'setupTests';
import { messageMock } from '__mocks__/chat-mocks';
import { StoresContext } from 'context/StoresContext';
import { currentUserMock } from '__mocks__/auth-mocks';
import AuthStore from 'stores/authStore';

describe('Message', () => {
  it('should render message data', async () => {
    const message = messageMock;

    render(
      <Message message={message} />,
    );

    const dateTimeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });
    const formattedDate = dateTimeFormat.format(new Date(message.createdAt));
    const createdAt = screen.getByText(formattedDate);

    expect(createdAt).toBeInTheDocument();
    expect(screen.queryByText(message.content)).toBeInTheDocument();
    expect(screen.queryByAltText('Avatar')).toHaveAttribute('src', message.sender.picture);
  });

  it('should render message style if user is message owner', () => {
    const authStore = new AuthStore();

    const message = messageMock;
    authStore.user = currentUserMock;

    render(
      <StoresContext.Provider value={{ authStore }}>
        <Message message={message} />
      </StoresContext.Provider>,
    );

    expect(screen.queryByTestId('message')?.classList.contains('owner')).toBeTruthy();
  });

  it('should render message style if user not message owner', () => {
    const authStore = new AuthStore();

    const message = messageMock;
    authStore.user._id = 'not message owner';

    render(
      <StoresContext.Provider value={{ authStore }}>
        <Message message={message} />
      </StoresContext.Provider>,
    );

    expect(screen.queryByTestId('message')?.classList.contains('owner')).toBeFalsy();
  });
});
