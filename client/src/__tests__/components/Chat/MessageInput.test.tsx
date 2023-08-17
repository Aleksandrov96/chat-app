/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from 'setupTests';
import { StoresContext } from 'context/StoresContext';
import MessageInput from 'components/Chat/MessageInput/MessageInput';
import ChatStore from 'stores/chatStore';
import userEvent from '@testing-library/user-event';
import { messageMock, currentChatroomMock } from '__mocks__/chat-mocks';
import { ChatService } from 'services/chat-service';
import AuthStore from 'stores/authStore';
import { currentUserMock } from '__mocks__/auth-mocks';

type Props = {
  authStore: AuthStore,
  chatStore: ChatStore,
};

const renderComponent = (props: Props): void => {
  const { authStore, chatStore } = props;
  render(
    <StoresContext.Provider value={{ authStore, chatStore }}>
      <MessageInput />
    </StoresContext.Provider>,
  );
};

beforeEach(() => {
  window.URL.createObjectURL = jest.fn().mockResolvedValueOnce('path');
});

describe('MessageInput', () => {
  it('should render correctly', () => {
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    authStore.user = currentUserMock;

    renderComponent({ authStore, chatStore });

    const messageInput = screen.queryByPlaceholderText('Write a message...') as HTMLTextAreaElement;
    const submitButton = screen.queryByRole('button', { name: 'message-submit-button' }) as HTMLButtonElement;
    const emojiButton = screen.queryByRole('button', { name: 'emoji-button' }) as HTMLButtonElement;
    const sendMessageIcon = screen.queryByTestId('message-send-icon');
    const fileUpload = screen.queryByTestId('file-upload-icon');

    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(sendMessageIcon).toBeInTheDocument();
    expect(fileUpload).toBeInTheDocument();
    expect(emojiButton).toBeInTheDocument();
  });

  it('should update textarea on change', async () => {
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    authStore.user = currentUserMock;

    renderComponent({ authStore, chatStore });

    const messageInput = screen.queryByPlaceholderText('Write a message...') as HTMLTextAreaElement;

    await waitFor(() => {
      userEvent.type(messageInput, 'test');
    });

    await waitFor(() => {
      expect(messageInput.value).toBe('test');
    });
  });

  it('should update file input on change and preview image', async () => {
    const file = new File(['file'], 'file.jpg', { type: 'image/jpg' });
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    authStore.user = currentUserMock;

    renderComponent({ authStore, chatStore });

    const fileInput = screen.queryByTestId('file-input') as HTMLInputElement;

    await waitFor(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.queryByTestId('attached-image')).toBeInTheDocument();
    });
  });

  it('should update file input on change and preview audio', async () => {
    const file = new File(['file'], 'file.mp3', { type: 'audio/mp3' });
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    authStore.user = currentUserMock;

    renderComponent({ authStore, chatStore });

    const fileInput = screen.queryByTestId('file-input') as HTMLInputElement;

    await waitFor(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.queryByTestId('attached-audio')).toBeInTheDocument();
    });
  });

  it('should update file input on change and preview video', async () => {
    const file = new File(['file'], 'file.mp4', { type: 'video/mp4' });
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    authStore.user = currentUserMock;

    renderComponent({ authStore, chatStore });

    const fileInput = screen.queryByTestId('file-input') as HTMLInputElement;

    await waitFor(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(screen.queryByTestId('attached-video')).toBeInTheDocument();
    });
  });

  it('should send message and reset textarea if submit', async () => {
    const file = new File(['file'], 'file.mp3', { type: 'audio/mp3' });
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    authStore.user = currentUserMock;

    renderComponent({ authStore, chatStore });

    const axiosResponseMock = {
      data: messageMock,
      status: 200,
      statusText: 'OK',
      headers: {
        'content-length': '805',
        'content-type': 'application/json; charset=utf-8',
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWtzYW5kcm92QGdtYWlsLmNvbSIsIl9pZCI6IjYzNDZiODVjNDg3ZjcxM2JlZTRhMzkyZiIsInBpY3R1cmUiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzkvOTkvU2FtcGxlX1VzZXJfSWNvbi5wbmciLCJpYXQiOjE2NzA5Mjg4NTQsImV4cCI6MTY3MTAxNTI1NH0.xCOpSJfFD1NQftgQduYQx7tEaVx3fZA4apTQ-yjaauE',
        },
        withCredentials: true,
        baseURL: 'http://localhost:5000',
        method: 'post',
        url: '/sendMessage',
        data: '{"content":"test","chatroomId":"63624569b610594d455aada2","userId":"6346b85c487f713bee4a392f","receiverId":"6346b6fc037fb36c421c1694"}',
      },
      request: {},
    };

    jest.spyOn(ChatService, 'sendMessage')
      .mockImplementation(() => Promise.resolve(axiosResponseMock));

    const messageInput = screen.queryByPlaceholderText('Write a message...') as HTMLTextAreaElement;
    const fileInput = screen.queryByTestId('file-input') as HTMLInputElement;
    const submitButton = screen.queryByRole('button', { name: 'message-submit-button' }) as HTMLButtonElement;

    const receiver = currentChatroomMock.participants
      .find((part) => part.email !== currentUserMock.email);

    await waitFor(() => {
      userEvent.type(messageInput, 'test');
    });

    await waitFor(() => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await waitFor(() => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(ChatService.sendMessage).toHaveBeenCalledWith('test', currentChatroomMock._id, currentUserMock._id, receiver?._id, [file]);
    });

    await waitFor(() => {
      expect(messageInput.value).toBe('');
    });
  });

  it('should send message and reset textarea if press enter', async () => {
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    authStore.user = currentUserMock;

    renderComponent({ authStore, chatStore });

    const axiosResponseMock = {
      data: messageMock,
      status: 200,
      statusText: 'OK',
      headers: {
        'content-length': '805',
        'content-type': 'application/json; charset=utf-8',
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWtzYW5kcm92QGdtYWlsLmNvbSIsIl9pZCI6IjYzNDZiODVjNDg3ZjcxM2JlZTRhMzkyZiIsInBpY3R1cmUiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzkvOTkvU2FtcGxlX1VzZXJfSWNvbi5wbmciLCJpYXQiOjE2NzA5Mjg4NTQsImV4cCI6MTY3MTAxNTI1NH0.xCOpSJfFD1NQftgQduYQx7tEaVx3fZA4apTQ-yjaauE',
        },
        withCredentials: true,
        baseURL: 'http://localhost:5000',
        method: 'post',
        url: '/sendMessage',
        data: '{"content":"test","chatroomId":"63624569b610594d455aada2","userId":"6346b85c487f713bee4a392f","receiverId":"6346b6fc037fb36c421c1694"}',
      },
      request: {},
    };

    jest.spyOn(ChatService, 'sendMessage')
      .mockImplementation(() => Promise.resolve(axiosResponseMock));

    const messageInput = screen.queryByPlaceholderText('Write a message...') as HTMLTextAreaElement;

    await waitFor(() => {
      userEvent.type(messageInput, 'test');
    });

    await waitFor(() => {
      userEvent.keyboard('{Enter}');
    });

    await waitFor(() => {
      expect(ChatService.sendMessage).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(messageInput.value).toBe('');
    });
  });

  it('should call displayMessage action', async () => {
    const chatStore = new ChatStore();
    const authStore = new AuthStore();

    chatStore.currentChatroom = currentChatroomMock;
    authStore.user = currentUserMock;
    chatStore.displayMessage = jest.fn();

    renderComponent({ authStore, chatStore });

    const axiosResponseMock = {
      data: messageMock,
      status: 200,
      statusText: 'OK',
      headers: {
        'content-length': '805',
        'content-type': 'application/json; charset=utf-8',
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        maxBodyLength: -1,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWtzYW5kcm92QGdtYWlsLmNvbSIsIl9pZCI6IjYzNDZiODVjNDg3ZjcxM2JlZTRhMzkyZiIsInBpY3R1cmUiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzkvOTkvU2FtcGxlX1VzZXJfSWNvbi5wbmciLCJpYXQiOjE2NzA5Mjg4NTQsImV4cCI6MTY3MTAxNTI1NH0.xCOpSJfFD1NQftgQduYQx7tEaVx3fZA4apTQ-yjaauE',
        },
        withCredentials: true,
        baseURL: 'http://localhost:5000',
        method: 'post',
        url: '/sendMessage',
        data: '{"content":"test","chatroomId":"63624569b610594d455aada2","userId":"6346b85c487f713bee4a392f","receiverId":"6346b6fc037fb36c421c1694"}',
      },
      request: {},
    };

    jest.spyOn(ChatService, 'sendMessage')
      .mockImplementation(() => Promise.resolve(axiosResponseMock));

    const messageInput = screen.queryByPlaceholderText('Write a message...') as HTMLTextAreaElement;
    const submitButton = screen.queryByRole('button', { name: 'message-submit-button' }) as HTMLButtonElement;

    await waitFor(() => {
      userEvent.type(messageInput, 'test');
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await waitFor(() => {
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(chatStore.displayMessage).toBeCalled();
    });
  });
});
