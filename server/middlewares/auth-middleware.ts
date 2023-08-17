import { ApiError } from '../exceptions/api-error.js';
import { TokenService } from '../services/token-service.js';
import { Request, Response, NextFunction } from 'express';
import { IUserDto } from 'interfaces/IUserDto.js';

export interface IUserAuthInfoRequest extends Request {
  user: IUserDto;
}

export function authMiddleware(req: IUserAuthInfoRequest, res: Response, next: NextFunction): void {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnautorizedError());
  }
}