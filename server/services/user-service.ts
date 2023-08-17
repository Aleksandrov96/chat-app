import { UserModel } from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { TokenService } from './token-service.js';
import { UserDto } from '../dtos/user-dto.js';
import { ApiError } from '../exceptions/api-error.js';
import { IUserDto } from 'interfaces/IUserDto.js';
import { IUserServiceResponse } from 'interfaces/responses/IUserServiceResponse.js';
import { DeleteResult } from 'mongodb';

export class UserService {
  static async signUp(email: string, password: string): Promise<IUserServiceResponse> {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with the same email ${email} already exists`);
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = await UserModel.create({ email, password: hashPassword });

    const userDto: IUserDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  static async signIn(email: string, password: string): Promise<IUserServiceResponse> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid password');
    }
    const userDto: IUserDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  static async signOut(refreshToken: string): Promise<DeleteResult> {
    const deleteResult = await TokenService.removeToken(refreshToken);
    return deleteResult;
  }

  static async refresh(refreshToken: string): Promise<IUserServiceResponse> {
    if (!refreshToken) {
      throw ApiError.UnautorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnautorizedError();
    }
    const user = await UserModel.findById(userData._id);
    const userDto: IUserDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto._id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  static async getUsers(): Promise<IUserDto[]> {
    const users = await UserModel.find();
    const filtered = users.map((user) => {
      const userDto: IUserDto = new UserDto(user);
      return userDto;
    });
    return filtered;
  }

  static async searchUsers(query: string): Promise<IUserDto[] | undefined> {
    let filtered;
    if (query.length !== 0) {
      const searchValue = { email: { $regex: new RegExp(query) } };
      const users = await UserModel.find(searchValue);
      filtered = users.map((user) => {
        const userDto: IUserDto = new UserDto(user);
        return userDto;
      });
    }
    return filtered;
  }
}
