/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import SidebarHeader from 'components/Sidebar/SidebarHeader/SidebarHeader';
import App from 'App/App';
import { StoresContext } from 'context/StoresContext';
import AuthStore from 'stores/authStore';
import ChatStore from 'stores/chatStore';
import SocketStore from 'stores/socketStore';
import { render, screen, waitFor } from 'setupTests';
import { currentUserMock } from '__mocks__/auth-mocks';
import userEvent from '@testing-library/user-event';

global.setImmediate = jest.useRealTimers as unknown as typeof setImmediate;

const mockedNavigate = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('SidebarHeader', () => {
  it('should render current user avatar, email, logout button', () => {
    const authStore = new AuthStore();

    authStore.user = currentUserMock;

    render(
      <StoresContext.Provider value={{ authStore }}>
        <SidebarHeader />
      </StoresContext.Provider>,
    );

    expect(screen.queryByAltText('User avatar')).toBeInTheDocument();
    expect(screen.queryByAltText('User avatar')).toHaveAttribute('src', authStore.user.picture);
    expect(screen.queryByText(authStore.user.email)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'signOut-button' })).toBeInTheDocument();
  });

  it('should logout if user click on logout button', async () => {
    const authStore = new AuthStore();
    const chatStore = new ChatStore();
    const socketStore = new SocketStore();

    authStore.user = currentUserMock;
    authStore.isAuth = true;

    authStore.signOut = jest.fn().mockImplementation(() => Promise.resolve()
      .then(() => {
        mockedNavigate('/login');
      }));

    render(
      <StoresContext.Provider value={{ chatStore, authStore, socketStore }}>
        <App />
      </StoresContext.Provider>,
    );

    const logoutButton = screen.queryByRole('button', { name: 'signOut-button' }) as HTMLButtonElement;

    userEvent.click(logoutButton);

    await waitFor(() => {
      expect(authStore.signOut).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith('/sign-in');
      expect(localStorage.getItem('token')).toBeFalsy();
    });
  });
});
