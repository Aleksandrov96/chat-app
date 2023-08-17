import { IUser } from './IUser';

export interface IChatRoom {
  _id: string;
  participants: IUser[];
  latestMessage?: {
    _id: string;
    sender: IUser;
    content: string;
    chatroom: string;
    isViewed: boolean;
    createdAt: string;
    updatedAt: string;
  };
  isTyping: boolean;
  createdAt: string;
  updatedAt: string;
}
