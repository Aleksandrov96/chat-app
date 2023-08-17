import React from 'react';
import App from 'App/App';
import { StoresContext } from 'context/StoresContext';
import { render, waitFor, screen } from 'setupTests';
import AuthStore from 'stores/authStore';

const mockedNavigate = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  let portalRoot = document.getElementById('portal');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal');
    document.body.appendChild(portalRoot);
  }
});

describe('App', () => {
  it('should render loader', async () => {
    const authStore = new AuthStore();

    authStore.isLoading = true;

    render(
      <StoresContext.Provider value={{ authStore }}>
        <App />
      </StoresContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('full-screen-loader')).toBeInTheDocument();
    });
  });

  it('should navigate to /login', async () => {
    const authStore = new AuthStore();

    authStore.isAuth = false;

    render(
      <StoresContext.Provider value={{ authStore }}>
        <App />
      </StoresContext.Provider>,
    );

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/sign-in');
    });
  });
});
