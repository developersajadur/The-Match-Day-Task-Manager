/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { userService } from './user.service';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const user = await userService.CreateUser(req.body);

  res.cookie('token', (user as any).token, {
    httpOnly: true,
    secure: config.node_env === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'User Registered Successfully',
    data: {
      user: {
        name: (user as any).user.name,
        email: (user as any).user.email,
        role: (user as any).user.role,
      },
      token: (user as any).token,
    },
  });
});

const getMe = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const user = await userService.getMe(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User fetched successfully',
    data: user,
  });
});

export const userController = {
  createUser,
  getMe,
};
