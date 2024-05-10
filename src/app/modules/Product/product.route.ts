import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import ProductControllers from './product.controller';
import ProductValidations from './product.validation';
const router = express.Router();

router.post(
  '/',
  authGuard('admin', 'user', 'manager'),
  validateRequest(ProductValidations.productValidationSchema),
  ProductControllers.addProduct,
);

router.get(
  '/',
  authGuard('admin', 'user', 'manager'),
  ProductControllers.getAllProducts,
);

router.get(
  '/:id',
  authGuard('admin', 'user', 'manager'),
  ProductControllers.getProductById,
);

router.delete(
  '/:id',
  authGuard('admin', 'user', 'manager'),
  ProductControllers.deleteProductById,
);

router.put(
  '/:id',
  authGuard('admin', 'user', 'manager'),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProductById,
);

router.post(
  '/delete-multiple-products',
  authGuard('admin', 'user', 'manager'),
  ProductControllers.deleteMultipleProducts,
);

export const ProductRoutes = router;
