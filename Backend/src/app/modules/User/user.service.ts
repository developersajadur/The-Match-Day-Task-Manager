/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { createToken } from '../../helpers/jwtHelper';
import config from '../../config';

const CreateUser = async (payload: Partial<IUser>): Promise<IUser> => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) {
    throw new AppError(status.CONFLICT, 'Email already in use');
  }

  const user = await User.create({
    ...payload,
    role: 'user',
  });

    const jwtPayload = {
      userId: user?._id.toString(),
      email: user?.email,
      role: user?.role,
    };
  
    const token = createToken(
      jwtPayload,
      config.jwt_token_secret as string,
      config.jwt_token_expires_in as any,
    );

  return { user, token } as any;
};

const getMe = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId).select('-password');
  return user;
}

export const userService = {
  CreateUser,
  getMe
};
