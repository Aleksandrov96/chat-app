import { Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/api-error.js';
import { ISendMessageRequest } from 'interfaces/requests/ISendMessageRequest.js';
import { MessageService } from '../services/message-service.js';
import { IFetchMessagesRequest } from 'interfaces/requests/IFetchMessagesRequest.js';
import { IChangeMessagesStatusRequest } from 'interfaces/requests/IChangeMessagesStatusRequest.js';
import jwt from 'jsonwebtoken';
import { IUserJWTPayload } from 'interfaces/IUserJWTPayload';
import { socketService } from '../index.js';
import { FileUploadService } from '../services/file-upload-service.js';

export class MessageController {
  static async handleMessage(req: ISendMessageRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { content, chatroomId, userId, receiverId } = req.body;

      if (!content || !chatroomId) {
        return next(ApiError.BadRequest('Invalid data passed into request'));
      }
      
      const files = req?.files as Express.Multer.File[];

      const file = {} as { url: string, mimetype: string };
      
      if (req.files?.length !== 0) {
        file.url = await FileUploadService.fileUpload(files[0], chatroomId);
        file.mimetype = files[0].mimetype;
      }
  
      const message = await MessageService.handleMessage(content, chatroomId, userId, file);
    
      const receiver = await socketService.findReceiverSocket(receiverId);
    
      socketService.sendMessage(receiver?.id as string, message);
      res.status(200).json(message);
    } catch (e) {
      next(e);
    }
  }

  static async fetchChatMessages(req: IFetchMessagesRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { chatroomId, skip, limit } = req.query;
      const messages = await MessageService.fetchChatMessages(chatroomId as string, skip as string, limit as string);
      res.status(200).json(messages);
    } catch (e) {
      next(e);
    }
  }

  static async fetchUnviewedMessages(req: IFetchMessagesRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = jwt.verify(req.cookies.refreshToken, process.env.JWT_REFRESH_SECRET as string) as IUserJWTPayload;
      const unviwedMessages = await MessageService.fetchUnviewedMessages(userData._id);
      res.status(200).json(unviwedMessages);
    } catch (e) {
      next(e);
    }
  }

  static changeMessageStatus(req: IChangeMessagesStatusRequest, res: Response, next: NextFunction): void {
    try {
      const { messagesIDs } = req.body;
      const changedMessages = MessageService.changeMessagesStatus(messagesIDs);
      res.status(200).json(changedMessages);
    } catch (e) {
      next(e);
    }
  }
}