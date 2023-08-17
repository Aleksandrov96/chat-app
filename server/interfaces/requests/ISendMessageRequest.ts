import { Request } from 'express';

export interface ISendMessageRequest extends Request {
  body: {
    content: string;
    chatroomId: string;
    userId: string;
    receiverId: string;
  }
}