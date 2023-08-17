import { IUser } from 'interfaces/IUser';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
