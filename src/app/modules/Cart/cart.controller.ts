import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CartServices from './cart.service';

const getCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartServices.getCart(req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully',
    data: cart,
  });
});

const addProductToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.addProductToCart(
    req.params.productId as unknown as Types.ObjectId,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added to cart successfully',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.removeFromCart(
    req.params.productId as unknown as Types.ObjectId,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product removed from cart successfully',
    data: result,
  });
});

const manipulateProductQuantity = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CartServices.manipulateProductQuantity(
      req.params.productId as unknown as Types.ObjectId,
      req.params.action,
      req.user as JwtPayload,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Product quantity ${req.params.action}ed successfully`,
      data: result,
    });
  },
);

const CartControllers = {
  addProductToCart,
  removeFromCart,
  manipulateProductQuantity,
  getCart,
};

export default CartControllers;
