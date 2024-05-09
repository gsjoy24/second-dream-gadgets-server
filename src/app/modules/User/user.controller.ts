import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserServices from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const user = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

const UserControllers = {
  createUser,
};

export default UserControllers;
