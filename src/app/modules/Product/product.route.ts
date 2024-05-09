import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import ProductControllers from './product.controller';
import ProductValidations from './product.validation';
const router = express.Router();

router.post(
  '/',
  authGuard('admin'),
  validateRequest(ProductValidations.productValidationSchema),
  ProductControllers.addProduct,
);

router.get('/', authGuard('admin'), ProductControllers.getAllProducts);

router.get('/:id', authGuard('admin'), ProductControllers.getProductById);

router.delete('/:id', authGuard('admin'), ProductControllers.deleteProductById);

router.put(
  '/:id',
  authGuard('admin'),
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProductById,
);

router.post(
  '/delete-multiple-products',
  authGuard('admin'),
  ProductControllers.deleteMultipleProducts,
);

export const ProductRoutes = router;
