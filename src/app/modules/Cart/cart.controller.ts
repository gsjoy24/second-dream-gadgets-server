import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CartServices from './cart.service';

const addProductToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.addProductToCart(
    req.body,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added to cart successfully',
    data: result,
  });
});

const CartControllers = {
  addProductToCart,
};

export default CartControllers;
