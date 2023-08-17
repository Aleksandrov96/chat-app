import { IUserDto } from '../IUserDto';

export interface IUserServiceResponse {
  user: IUserDto;
  accessToken: string;
  refreshToken: string;
}