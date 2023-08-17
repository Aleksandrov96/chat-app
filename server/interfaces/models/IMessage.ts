import { Types } from 'mongoose';

export interface IMessage {
  sender: Types.ObjectId;
  content: string;
  chatroom: Types.ObjectId;
  isViewed: boolean;
  files?: {
    url: string;
    mimetype: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}