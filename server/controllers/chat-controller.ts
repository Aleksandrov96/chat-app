import { ChatService } from '../services/chat-service.js';
import { ApiError } from '../exceptions/api-error.js';
import { Response, NextFunction } from 'express';
import { IChatControllerRequest } from 'interfaces/requests/IChatControllerRequest.js';
import jwt from 'jsonwebtoken';
import { IUserJWTPayload } from 'interfaces/IUserJWTPayload';

export class ChatController {
  static async accessChatroom(req: IChatControllerRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { senderId, receiverId } = req.body;
      if (!senderId || !receiverId) {
        return next(ApiError.BadRequest('Bad request'));
      }
      const fullChat = await ChatService.accessChatroom(senderId, receiverId);
      res.send(fullChat);
    } catch (e) {
      next(e);
    }
  }

  static async fetchUserChats(req: Omit<IChatControllerRequest, 'receiverId'>, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = jwt.verify(req.cookies.refreshToken, process.env.JWT_REFRESH_SECRET as string) as IUserJWTPayload;
      if (!userData) {
        return next(ApiError.BadRequest('Bad request'));
      }
      const chats = await ChatService.fetchUserChats(userData._id);
      res.status(200).send(chats);
    } catch (e) {
      next();
    }
  }
}