import { IUser } from 'interfaces/models/IUser';
import { Schema, model } from 'mongoose';

const User = new Schema({
  email: { type: String, unique: true, required: true, index: true, sparce: true },
  password: { type: String, required: true },
  picture: {
    type: String,
    required: true,
    default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  },
});

export const UserModel = model<IUser>('User', User);