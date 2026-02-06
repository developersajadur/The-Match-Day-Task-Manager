import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidation.registerUserSchema),
  userController.createUser,
);

router.get('/me', auth(USER_ROLE.ADMIN, USER_ROLE.USER), userController.getMe);

export const userRoutes = router;
