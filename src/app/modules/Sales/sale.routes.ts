import express from 'express';
import authGuard from '../../middlewares/authGuard';
import validateRequest from '../../middlewares/validateRequest';
import SaleControllers from './sale.controller';
import SaleValidations from './sale.validation';

const router = express.Router();

router.post(
  '/sell-all-products',
  authGuard('user', 'manager'),
  validateRequest(SaleValidations.SaleValidationSchema),
  SaleControllers.addSale,
);
// router.get('/', authGuard('admin'), SaleControllers.getAllSales);
router.get('/:id', authGuard('admin'), SaleControllers.getSaleById);
router.delete('/:id', authGuard('admin'), SaleControllers.deleteSaleById);

router.post(
  '/delete-multiple-sales',
  authGuard('admin'),
  SaleControllers.deleteMultipleSales,
);

const SaleRoutes = router;

export default SaleRoutes;
