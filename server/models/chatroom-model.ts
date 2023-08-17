import { IChatroom } from 'interfaces/models/IChatroom';
import { Schema, model } from 'mongoose';

const Chatroom = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
},
{
  timestamps: true,
});

export const ChatroomModel = model<IChatroom>('Chatroom', Chatroom); 