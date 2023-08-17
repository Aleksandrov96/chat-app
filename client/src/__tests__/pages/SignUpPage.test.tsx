/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
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

describe('SignUpPage', () => {
  it('should render correctly', async () => {
    const { asFragment } = render(<SignUpPage />);

    await waitFor(async () => {
      expect(screen.queryByTestId('signUp-page')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Password')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Repeat password')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'signUp-submit-button' })).toBeInTheDocument();
      expect(screen.queryByRole('form', { name: 'signUp-form' })).toBeInTheDocument();
      expect(screen.queryByText('Back to sign in')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should updates inputs on change', async () => {
    render(<SignUpPage />);

    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;
    const repeatPasswordInput = screen.queryByPlaceholderText('Repeat password') as HTMLInputElement;

    userEvent.type(emailInput, 'test');
    userEvent.type(passwordInput, 'test');
    userEvent.type(repeatPasswordInput, 'test');

    expect(emailInput.value).toBe('test');
    expect(passwordInput.value).toBe('test');
    expect(repeatPasswordInput.value).toBe('test');
  });

  it('should calls the onSubmit with valid inputs and navigate to LoginPage', async () => {
    const authStore = new AuthStore();

    authStore.signUp = jest.fn().mockImplementation(() => Promise.resolve()
      .then(() => {
        mockedNavigate('/sign-in');
      }));

    render(
      <StoresContext.Provider value={{ authStore }}>
        <SignUpPage />
      </StoresContext.Provider>,
    );

    expect(screen.queryByTestId('signUp-page')).toBeInTheDocument();

    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;
    const repeatPasswordInput = screen.queryByPlaceholderText('Repeat password') as HTMLInputElement;
    const submitButton = screen.queryByRole('button', { name: 'signUp-submit-button' }) as HTMLButtonElement;

    await act(async () => {
      userEvent.type(emailInput, 'email@test.com');
      userEvent.type(passwordInput, '123456');
      userEvent.type(repeatPasswordInput, '123456');
    });

    await waitFor(async () => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(authStore.signUp).toHaveBeenCalled();
    });
    expect(mockedNavigate).toHaveBeenCalledWith('/sign-in');
  });

  it('makes submit button disabled if inputs are empty', async () => {
    render(<SignUpPage />);

    await act(async () => {
      const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;
      const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;
      const repeatPasswordInput = screen.queryByPlaceholderText('Repeat password') as HTMLInputElement;

      userEvent.clear(emailInput);
      fireEvent.blur(emailInput);
      userEvent.clear(passwordInput);
      fireEvent.blur(passwordInput);
      userEvent.clear(repeatPasswordInput);
      fireEvent.blur(repeatPasswordInput);
    });

    const submitButton = screen.queryByRole('button', { name: 'signUp-submit-button' }) as HTMLButtonElement;

    expect(submitButton).toBeDisabled();
  });

  it('makes submit button disabled if data invalid', async () => {
    render(<SignUpPage />);

    await act(async () => {
      const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;
      const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;
      const repeatPasswordInput = screen.queryByPlaceholderText('Repeat password') as HTMLInputElement;

      userEvent.type(emailInput, 'invalid');
      fireEvent.blur(emailInput);
      userEvent.type(passwordInput, '12');
      fireEvent.blur(passwordInput);
      userEvent.type(repeatPasswordInput, '1');
      fireEvent.blur(repeatPasswordInput);
    });

    const submitButton = screen.queryByRole('button', { name: 'signUp-submit-button' }) as HTMLButtonElement;

    expect(submitButton).toBeDisabled();
  });

  it('renders the email validation error', async () => {
    const { container } = render(<SignUpPage />);

    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement;

    userEvent.type(emailInput, 'test');
    userEvent.clear(emailInput);
    fireEvent.blur(emailInput);

    await waitFor(async () => {
      expect(container.innerHTML).toMatch('Email is required');
    });
  });

  it('renders the password validation error', async () => {
    const { container } = render(<SignUpPage />);

    await act(async () => {
      const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;

      userEvent.type(passwordInput, '12');
      fireEvent.blur(passwordInput);
    });

    await waitFor(async () => {
      expect(container.innerHTML).toMatch('Password should be at least 6 characters');
    });
  });

  it('renders the password confirmation validation error', async () => {
    const { container } = render(<SignUpPage />);

    await act(async () => {
      const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement;
      const repeatPasswordInput = screen.queryByPlaceholderText('Repeat password') as HTMLInputElement;

      userEvent.type(passwordInput, '123456');
      fireEvent.blur(passwordInput);
      userEvent.type(repeatPasswordInput, 'password');
      fireEvent.blur(repeatPasswordInput);
    });

    await waitFor(async () => {
      expect(container.innerHTML).toMatch('Password do not match');
    });
  });
});
