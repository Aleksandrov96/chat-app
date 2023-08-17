/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import Search from 'components/Sidebar/Search/Search';
import userEvent from '@testing-library/user-event';
import { StoresContext } from 'context/StoresContext';
import ChatStore from 'stores/chatStore';
import { render, screen, waitFor } from '../../../setupTests';

describe('Search', () => {
  it('should render Search component', () => {
    render(<Search />);

    expect(screen.queryByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should updates input on change', async () => {
    render(<Search />);

    const searchInput = screen.queryByPlaceholderText('Search') as HTMLInputElement;

    await waitFor(() => {
      userEvent.type(searchInput, 'test');
    });

    expect(searchInput.value).toBe('test');
  });

  it('should call an searchUsers action', async () => {
    const chatStore = new ChatStore();

    chatStore.searchUsers = jest.fn().mockResolvedValue('User');

    render(
      <StoresContext.Provider value={{ chatStore }}>
        <Search />
      </StoresContext.Provider>,
    );

    const searchInput = screen.queryByPlaceholderText('Search') as HTMLInputElement;

    await waitFor(() => {
      userEvent.type(searchInput, 't');
    });

    await waitFor(() => {
      expect(chatStore.searchValue).toBe('t');
    });

    await waitFor(async () => {
      await expect(chatStore.searchUsers(chatStore.searchValue)).resolves.not.toThrow();
    });
  });
});
