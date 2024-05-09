import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import SaleControllers from './Sale.controller';
import SaleValidations from './Sale.validation';

const router = express.Router();

router.post(
  '/',
  authGuard('admin'),
  validateRequest(SaleValidations.SaleValidationSchema),
  SaleControllers.addSale,
);
router.get('/', authGuard('admin'), SaleControllers.getAllSales);
router.get('/:id', authGuard('admin'), SaleControllers.getSaleById);
router.delete('/:id', authGuard('admin'), SaleControllers.deleteSaleById);
router.put(
  '/:id',
  authGuard('admin'),
  validateRequest(SaleValidations.SaleUpdateValidationSchema),
  SaleControllers.updateSaleById,
);
router.post(
  '/delete-multiple-sales',
  authGuard('admin'),
  SaleControllers.deleteMultipleSales,
);

const SaleRoutes = router;

export default SaleRoutes;
