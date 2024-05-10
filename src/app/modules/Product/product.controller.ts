import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ProductServices from './product.service';

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductServices.addProductIntoDB(
    req.body,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product added successfully',
    data: product,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { meta, allProducts } = await ProductServices.getAllProductsFromDB(
    req.query,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All products fetched successfully',
    meta,
    data: allProducts,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductServices.getProductByIdFromDB(
    req.params.id,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product fetched successfully',
    data: product,
  });
});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  await ProductServices.deleteProductByIdFromDB(
    req.params.id,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: null,
  });
});

const deleteMultipleProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await ProductServices.deleteMultipleProductsFromDB(
      req.body.product_ids,
      req.user as JwtPayload,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products deleted successfully',
      data: products,
    });
  },
);

const updateProductById = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductServices.updateProductByIdFromDB(
    req.params.id,
    req.body,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

const ProductControllers = {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  deleteMultipleProducts,
  updateProductById,
};

export default ProductControllers;
