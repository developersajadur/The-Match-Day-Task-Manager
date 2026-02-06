/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../helpers/catchAsync';
import { User } from '../modules/User/user.model';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwtHelper';
import config from '../config';
import { TUserRole } from '../modules/User/user.constant';

export type TTokenUser = {
  userId: string;
  email: string;
  role: TUserRole;
  iat: number;
  exp: number;
};

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (
      req: Request & { user?: TTokenUser },
      res: Response,
      next: NextFunction,
    ) => {
      const token =
        (await req.headers?.authorization) ||
        req.cookies?.token ||
        req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
      }

      const verifiedUser = verifyToken(
        token as string,
        config.jwt_token_secret as string,
      ) as TTokenUser;
      const user: any = User.findById(verifiedUser.userId);
      if (!user) {
        throw new AppError(status.UNAUTHORIZED, 'User not found!');
      }
      if (user.isBlocked) {
        throw new AppError(status.FORBIDDEN, 'User is blocked!');
      }
      if (user.isDeleted) {
        throw new AppError(status.FORBIDDEN, 'User is Deleted!');
      }

      if (verifiedUser.exp && Date.now() >= verifiedUser.exp * 1000) {
        throw new AppError(status.UNAUTHORIZED, 'Token expired.');
      }

      if (requiredRoles && !requiredRoles.includes(verifiedUser.role)) {
        throw new AppError(
          status.UNAUTHORIZED,
          'You are not allow to access this api!',
        );
      }

      req.user = verifiedUser;
      next();
    },
  );
};

export default auth;
