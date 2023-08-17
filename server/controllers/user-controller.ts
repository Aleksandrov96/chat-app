import { validationResult } from 'express-validator'; 
import { UserService } from '../services/user-service.js';
import { ApiError } from '../exceptions/api-error.js';
import { Request, Response, NextFunction } from 'express';
import { IUserControllerRequest } from 'interfaces/requests/IUserControllerRequest.js';

export class UserController {
  static async signUp(req: IUserControllerRequest, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error', errors.array() as []));
      }
      const { email, password } = req.body;
      const userData = await UserService.signUp(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  
  static async signIn(req: IUserControllerRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.signIn(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 72 * 60 * 60 * 1000, httpOnly: true });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async signOut(req: IUserControllerRequest, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.signOut(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req: IUserControllerRequest, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 72 * 60 * 60 * 1000, httpOnly: true });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
    
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  static async searchUsers(req: Request<{ query: string }>, res: Response, next: NextFunction) {
    try {
      const { query } = req.query;
      const results = await UserService.searchUsers(query as string);
      return res.json(results);
    } catch (e) {
      next(e);
    }
  }
}
