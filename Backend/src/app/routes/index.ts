import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRoute } from '../modules/Auth/auth.route';
import { taskRoutes } from '../modules/Task/task.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoutes,
  },
    {
    path: '/tasks',
    route: taskRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
