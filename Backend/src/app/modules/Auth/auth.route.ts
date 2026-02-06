import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/login',
  validateRequest(authValidation.loginUserValidationSchema),
  AuthControllers.loginUser,
);

router.get('/me', auth(USER_ROLE.ADMIN, USER_ROLE.USER), AuthControllers.getMeForAuth);
router.post('/logout', AuthControllers.logout);

export const authRoute = router;
