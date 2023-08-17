import { Types } from 'mongoose';

export interface IUnviewedMesssage {
  _id: Types.ObjectId;
  sender: {
    _id: Types.ObjectId;
    email: string;
    picture: string;
  };
  content: string;
  chatroom: {
    _id: Types.ObjectId;
    participants: {
      _id: Types.ObjectId;
      email: string;
      picture: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
    latestMessage: string;
  };
  isViewed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
