import { Request } from 'express';

export interface IUserControllerRequest extends Request {
  body: {
    email: string;
    password: string;
  },
  cookies: {
    refreshToken: string;
  },
}