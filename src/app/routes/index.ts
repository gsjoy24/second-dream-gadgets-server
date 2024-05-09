import { Router } from 'express';
import { UserRoutes } from '../modules/Auth/Auth.route';
import { ProductRoutes } from '../modules/Product/product.route';
import SaleRoutes from '../modules/Sales/Sale.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/sales',
    route: SaleRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
