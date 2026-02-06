import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { taskController } from './task.controller';
import { taskValidation } from './task.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth(USER_ROLE.USER), taskController.getAllTasksPerUser);

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(taskValidation.createTaskSchema),
  taskController.createTask,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.USER),
  validateRequest(taskValidation.updateTaskStatusSchema),
  taskController.updateTaskStatus,
);

router.patch(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(taskValidation.updateTaskSchema),
  taskController.updateTask,
);

router.patch(
  '/:id/reorder',
  auth(USER_ROLE.USER),
  validateRequest(taskValidation.reorderTaskSchema),
  taskController.reorderTask,
);

router.delete('/:id', auth(USER_ROLE.USER), taskController.deleteTask);

export const taskRoutes = router;
