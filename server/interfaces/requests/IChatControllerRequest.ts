import { Request } from 'express';

export interface IChatControllerRequest extends Request {
  body: {
    senderId: string;
    receiverId: string;
  };
  cookies: {
    refreshToken: string;
  }
}