import { Types } from 'mongoose';

export interface IChatroom {
  participants: Types.Array<Types.ObjectId>;
  latestMessage: Types.ObjectId;
  createdAt: Date;
  updateAt: Date;
}