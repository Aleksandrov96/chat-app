import { Request } from 'express';

export interface IFetchMessagesRequest extends Request {
  params: {
    chatroomId: string;
    skip?: string;
    limit?: string;
  },
  cookies: {
    refreshToken: string;
  }
}