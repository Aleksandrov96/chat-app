import jwt from 'jsonwebtoken';
import { TokenModel } from '../models/token-model.js';
import { DeleteResult } from 'mongodb';
import { IUserDto } from 'interfaces/IUserDto.js';
import { IUserJWTPayload } from 'interfaces/IUserJWTPayload.js';

export class TokenService {
  static generateTokens(payload: IUserDto): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '24h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '72h' });

    return {
      accessToken,
      refreshToken,
    };
  }

  static validateAccessToken(token: string): IUserJWTPayload | null {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as IUserJWTPayload;
      return userData;
    } catch (e) {
      return null;
    }
  }

  static validateRefreshToken(token: string): IUserJWTPayload | null {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as IUserJWTPayload;
      return userData;
    } catch (e) {
      return null;
    }
  }

  static async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  static async removeToken(refreshToken: string): Promise<DeleteResult> {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  static async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }
}