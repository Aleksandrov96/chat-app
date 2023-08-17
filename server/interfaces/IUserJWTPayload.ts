import { JwtHeader, JwtPayload } from 'jsonwebtoken';

export interface IUserJWTPayload extends JwtPayload {
  email: string;
  _id: string;
  picture: string;
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
}

















