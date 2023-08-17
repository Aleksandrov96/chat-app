import { Request } from 'express';

export interface IChangeMessagesStatusRequest extends Request {
  body: {
    messagesIDs: string[];
  }
}