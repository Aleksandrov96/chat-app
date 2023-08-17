import { IMessage } from 'interfaces/IMessage';
import { io } from 'socket.io-client';
import SocketStore from 'stores/socketStore';
import ChatStore from 'stores/chatStore';
import { setToastError } from 'utils/setToastError';

export class SocketService {
  static initSocket = (socketStore: SocketStore, chatStore?: ChatStore): void => {
    const token = localStorage.getItem('token');

    socketStore.setSocket(io(process.env.REACT_APP_API_URL, { auth: { token } }));

    if (chatStore) {
      this.onReceivedMessage(socketStore, chatStore);
      this.onTyping(socketStore, chatStore);
    }
  };

  static onReceivedMessage = (socketStore: SocketStore, chatStore: ChatStore): void => {
    socketStore.socket.on('message:received', (message: IMessage) => {
      chatStore.setReceivedMessage(message)
        .catch((e) => setToastError(e.message as string));
    });
  };

  static onTyping = (socketStore: SocketStore, chatStore: ChatStore): void => {
    let timeout: NodeJS.Timeout;
    socketStore.socket.on('isTyping', (senderId: string) => {
      clearTimeout(timeout);

      chatStore.setIsTyping(senderId, true);

      timeout = setTimeout(() => {
        if (senderId) {
          clearTimeout(timeout);
        }
        chatStore.setIsTyping(senderId, false);
      }, 3000);
    });
  };

  static disconnectSocket = (socketStore: SocketStore): void => {
    socketStore.socket.disconnect();
  };
}
