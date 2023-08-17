import axios, { AxiosError, AxiosResponse } from 'axios';
import { IChatRoom } from 'interfaces/IChatRoom';
import { IMessage } from 'interfaces/IMessage';
import { IUser } from 'interfaces/IUser';
import { setToastError } from 'utils/setToastError';
import $api from 'api';

export class ChatService {
  static accessChatroom = async (
    senderId: string,
    receiverId: string,
  ): Promise<IChatRoom | null> => {
    try {
      const { data } = await $api.post<IChatRoom>('/accessChatroom', { senderId, receiverId });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };

  static fetchUserChats = async (): Promise<IChatRoom[] | null> => {
    try {
      const { data } = await $api.get<IChatRoom[]>('/fetchUserChats');
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };

  static fetchChatMessages = async (
    chatroomId: string,
    skip?: number,
    limit?: number,
  ): Promise<IMessage[] | null> => {
    try {
      const { data } = await $api.get<IMessage[]>('/fetchChatMessages', { params: { chatroomId, skip, limit } });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };

  static sendMessage = async (
    content: string,
    chatroomId: string,
    userId: string,
    receiverId: string,
    files?: FileList,
  ): Promise<AxiosResponse<IMessage> | null> => {
    const formData = new FormData();

    formData.append('content', content);
    formData.append('chatroomId', chatroomId);
    formData.append('userId', userId);
    formData.append('receiverId', receiverId);

    if (files) {
      formData.append('files', files[0]);
    }

    try {
      const response = await $api.post<IMessage>('/sendMessage', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };

  static fetchUnviewedMessages = async (): Promise<IMessage[] | null> => {
    try {
      const { data } = await $api.get<IMessage[]>('/fetchUnviewedMessages');
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };

  static changeMessagesStatus = async (
    messagesIDs: string[],
  ): Promise<IMessage[] | null> => {
    try {
      const { data } = await $api.post<IMessage[]>('/changeMessagesStatus', { messagesIDs });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };

  static searchUsers = async (query: string): Promise<IUser[] | null> => {
    try {
      const { data } = await $api.get<IUser[]>('/searchUsers', { params: { query } });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };
}
