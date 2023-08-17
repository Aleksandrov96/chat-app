import { IMessage } from 'interfaces/models/IMessage';
import { Schema, model } from 'mongoose';

const Message = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, trim: true },
  chatroom: { type: Schema.Types.ObjectId, ref: 'Chatroom' },
  isViewed: { type: Schema.Types.Boolean },
  files: [{ url: { type: String, trim: true }, mimetype: { type: String, trim: true } }],
},
{
  timestamps: true,
},
);

export const MessageModel = model<IMessage>('Message', Message);