import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserServices from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully!',
    data: user,
  });
});

const createAdminAndManager = catchAsync(
  async (req: Request, res: Response) => {
    const user = await UserServices.createAdminAndManagerIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: `New ${user.role} added successfully!`,
      data: user,
    });
  },
);

const UserControllers = {
  createUser,
  createAdminAndManager,
};

export default UserControllers;
