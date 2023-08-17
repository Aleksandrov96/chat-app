import { IToken } from 'interfaces/models/IToken';
import { Schema, model } from 'mongoose';

const Token = new Schema({
  user: { type: Schema.Types.ObjectId, unique: true, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export const TokenModel = model<IToken>('Token', Token);