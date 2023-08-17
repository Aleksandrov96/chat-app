import { IUser } from 'interfaces/IUser';
import { makeAutoObservable } from 'mobx';
import { ChatService } from 'services/chat-service';
import { AxiosError, AxiosResponse } from 'axios';
import { setToastError } from 'utils/setToastError';
import { IChatRoom } from 'interfaces/IChatRoom';
import { IMessage } from 'interfaces/IMessage';

export default class ChatStore {
  userSearchResults = [] as IUser[];

  currentChatroom = {} as IChatRoom;

  chats = [] as IChatRoom[];

  currentChatMessages = [] as IMessage[];

  unviewedMessages = [] as IMessage[];

  searchValue = '';

  receivedMessage = {} as IMessage;

  showContextMenu = false;

  showChatInfo = false;

  anchorPoint = {
    x: 0,
    y: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUserSearchResults(userSearchResults: IUser[]): void {
    this.userSearchResults = userSearchResults;
  }

  setCurrentChatroom(chatroom: IChatRoom): void {
    this.currentChatroom = chatroom;
  }

  setChats(chats: IChatRoom[]): void {
    this.chats = chats;
  }

  setCurrentChatMessages(messages: IMessage[]): void {
    this.currentChatMessages = messages;
  }

  setUnviewedMessages(unviewedMessages: IMessage[]): void {
    this.unviewedMessages = unviewedMessages;
  }

  setSearchValue(value: string): void {
    this.searchValue = value;
  }

  setShowContextMenu(boolean: boolean): void {
    this.showContextMenu = boolean;
  }

  setAnchorPoint(x: number, y: number): void {
    this.anchorPoint.x = x;
    this.anchorPoint.y = y;
  }

  setShowChatInfo(): void {
    this.showChatInfo = !this.showChatInfo;
  }

  displayMessage(response: AxiosResponse<IMessage>): void {
    if (response.status === 200) {
      try {
        this.setCurrentChatMessages([...this.currentChatMessages, response.data]);
      } catch (e) {
        if (e instanceof AxiosError) {
          setToastError(e.response?.data?.message as string);
        }
      }
    }
  }

  filterUnviewedMessages(messageId: string): void {
    const unviewedMessages = this.unviewedMessages.filter((message) => message._id !== messageId);
    this.setUnviewedMessages(unviewedMessages);
  }

  setIsTyping(senderId: string, isTyping: boolean): void {
    const chat = this.chats.find((c) => c.participants.find((part) => part._id === senderId));
    if (chat) {
      chat.isTyping = isTyping;
    }
    if (this.currentChatroom.participants !== undefined) {
      if (this.currentChatroom.participants.some((part) => part._id === senderId)) {
        this.currentChatroom.isTyping = isTyping;
      }
    }
  }

  async setReceivedMessage(message: IMessage): Promise<void> {
    this.receivedMessage = message;
    if (this.currentChatroom._id === message.chatroom._id) {
      this.setCurrentChatMessages([...this.currentChatMessages, message]);

      const currentChatUnviewedMessages = this.unviewedMessages.filter(
        (unviewedMessage) => unviewedMessage.chatroom._id === this.currentChatroom._id,
      );

      if (currentChatUnviewedMessages.length === 0) {
        await ChatService.changeMessagesStatus([message._id]);

        this.filterUnviewedMessages(message._id);
      }
    } else {
      this.setUnviewedMessages([...this.unviewedMessages, message]);
    }
  }

  async searchUsers(query: string): Promise<void> {
    if (query) {
      const data = await ChatService.searchUsers(query);
      if (data !== null) {
        this.setUserSearchResults(data);
      }
    }
  }

  async accessChatroom(senderId: string, receiverId: string): Promise<void> {
    const data = await ChatService.accessChatroom(senderId, receiverId);
    if (data !== null) {
      this.setCurrentChatroom(data);
    }
  }

  async fetchChats(): Promise<void> {
    const data = await ChatService.fetchUserChats();
    if (data !== null) {
      this.setChats(data);
    }
  }

  async fetchChatMessages(chatroomId: string, skip?: number, limit?: number): Promise<void> {
    const data = await ChatService.fetchChatMessages(chatroomId, skip, limit);
    if (data !== null) {
      if (skip) {
        this.setCurrentChatMessages([...data, ...this.currentChatMessages]);
      }
      if (!skip) {
        this.setCurrentChatMessages(data);
      }
    }
  }

  async fetchUnviewedMessages(): Promise<void> {
    const data = await ChatService.fetchUnviewedMessages();
    if (data !== null) {
      this.setUnviewedMessages(data);
    }
  }
}
