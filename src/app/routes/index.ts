import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

import { UserRoutes } from '../modules/User/user.route';
import { BuyerRoutes } from '../modules/Buyer/buyer.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/buyer',
    route: BuyerRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
