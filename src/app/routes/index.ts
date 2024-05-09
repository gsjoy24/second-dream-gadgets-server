import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/Auth.route';
import { ProductRoutes } from '../modules/Product/product.route';
import SaleRoutes from '../modules/Sales/Sale.route';
import { UserRoutes } from '../modules/User/user.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
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
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
