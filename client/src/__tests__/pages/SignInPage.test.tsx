/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import SignInPage from 'pages/SignInPage/SignInPage';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { StoresContext } from 'context/StoresContext';
import AuthStore from 'stores/authStore';
import {
  render, fireEvent, screen, waitFor,
} from '../../setupTests';

const mockedNavigate = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('SignInPage', () => {
  it('should render correctly', async () => {
    const { asFragment } = render(<SignInPage />);

    await waitFor(async () => {
      expect(screen.queryByTestId('signIn-page')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'signIn-submit-button' })).toBeInTheDocument();
      expect(screen.queryByRole('form', { name: 'signIn-form' })).toBeInTheDocument();
      expect(screen.queryByText('Don\'t have an account yet?')).toBeInTheDocument();
      expect(screen.queryByText('Sign up now')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Password')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should updates inputs on change', async () => {
    render(<SignInPage />);

    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;

    userEvent.type(emailInput, 'test');
    userEvent.type(passwordInput, 'test');

    expect(emailInput.value).toBe('test');
    expect(passwordInput.value).toBe('test');
  });

  it('should calls the onSubmit with valid inputs and renders RegisterPage when follow link', async () => {
    const authStore = new AuthStore();

    authStore.signIn = jest.fn();
    authStore.isAuth = true;

    render(
      <StoresContext.Provider value={{ authStore }}>
        <SignInPage />
      </StoresContext.Provider>,
    );

    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;
    const submitButton = screen.queryByRole('button', { name: 'signIn-submit-button' }) as HTMLButtonElement;

    await act(async () => {
      userEvent.type(emailInput, 'email@test.com');
      userEvent.type(passwordInput, '123456');
    });

    await waitFor(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => expect(authStore.signIn).toHaveBeenCalled());
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  it('makes submit button disabled if inputs are empty', async () => {
    render(<SignInPage />);

    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;
    const submitButton = screen.queryByRole('button', { name: 'signIn-submit-button' }) as HTMLButtonElement;

    userEvent.clear(emailInput);
    fireEvent.blur(emailInput);
    userEvent.clear(passwordInput);
    fireEvent.blur(passwordInput);

    expect(submitButton).toBeDisabled();
  });

  it('makes submit button disabled if data invalid', async () => {
    render(<SignInPage />);

    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;
    const submitButton = screen.queryByRole('button', { name: 'signIn-submit-button' }) as HTMLButtonElement;

    userEvent.type(emailInput, 'invalid');
    fireEvent.blur(emailInput);
    userEvent.type(passwordInput, '12');
    fireEvent.blur(passwordInput);

    expect(submitButton).toBeDisabled();
  });

  it('renders the email validation error', async () => {
    const { container } = render(<SignInPage />);

    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;

    userEvent.type(emailInput, 'test');
    userEvent.clear(emailInput);
    fireEvent.blur(emailInput);

    await waitFor(async () => {
      expect(container.innerHTML).toMatch('Email is required');
    });
  });

  it('renders the password validation error', async () => {
    const { container } = render(<SignInPage />);
    const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;

    userEvent.type(passwordInput, '12');
    fireEvent.blur(passwordInput);

    await waitFor(async () => {
      expect(container.innerHTML).toMatch('Password should be at least 6 characters');
    });
  });
});
