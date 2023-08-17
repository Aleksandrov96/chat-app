import { IUser } from './IUser';
import { IFile } from './IFiles';

export interface IMessage {
  _id: string;
  sender: IUser;
  content: string;
  chatroom: {
    _id: string;
    participants: IUser[];
    latestMessage: string;
    createdAt: string;
    updatedAt: string;
  };
  isViewed: boolean;
  files?: IFile[];
  createdAt: string;
  updatedAt: string;
}
