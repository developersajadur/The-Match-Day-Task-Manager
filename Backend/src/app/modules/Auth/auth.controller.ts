import status from 'http-status';
import config from '../../config';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  // console.log(req);
  const result = await AuthServices.loginUser(req?.body);
  const { token } = result;
  res.cookie('token', token, {
    httpOnly: true,
  secure: config.node_env === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Logged in successfully!',
    data: { token },
  });
});


const getMeForAuth = catchAsync(async (req, res) => {
  const user = req.user;

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logout successful",
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  logout,
  getMeForAuth
};
