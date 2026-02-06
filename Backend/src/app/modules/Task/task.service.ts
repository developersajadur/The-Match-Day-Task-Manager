import status from 'http-status';
import AppError from '../../errors/AppError';
import { ITask, TTaskStatus } from './task.interface';
import { Task } from './task.model';

const createTask = async (
  payload: Partial<ITask>,
  userId: string,
): Promise<ITask> => {
  const lastTask = await Task.findOne({
    createdBy: userId,
    status: 'To-Do',
  })
    .sort({ priority: -1 })
    .select('priority');

  const nextPriority = lastTask ? lastTask.priority + 1 : 1;

  return Task.create({
    title: payload.title,
    description: payload.description ?? '',
    createdBy: userId,
    priority: nextPriority,
  });
};

const getAllTasksPerUser = async (userId: string) => {
  return Task.find({ createdBy: userId }).sort({
    status: 1,
    priority: 1,
  });
};

const updateTaskStatus = async (
  taskId: string,
  statusValue: TTaskStatus,
  userId: string,
): Promise<ITask> => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(status.NOT_FOUND, 'Task not found');
  }

  if (task.createdBy.toString() !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      'You cannot update another user’s task',
    );
  }

  // Dependency rule
  if (
    statusValue === 'Done' &&
    (!task.description || task.description.length <= 20)
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      'Task description must be longer than 20 characters to move to Done',
    );
  }

  // Find last priority in target column
  const lastTaskInTarget = await Task.findOne({
    createdBy: userId,
    status: statusValue,
  })
    .sort({ priority: -1 })
    .select('priority');

  const newPriority = lastTaskInTarget ? lastTaskInTarget.priority + 1 : 1;

  // Simulated failure
  if (Math.random() < 0.2) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Simulated backend failure',
    );
  }

  task.status = statusValue;
  task.priority = newPriority;
  await task.save();

  return task;
};

const reorderTask = async (
  taskId: string,
  taskStatus: TTaskStatus,
  targetPriority: number,
  userId: string,
): Promise<ITask> => {
  const task = await Task.findById(taskId);
  if (!task) throw new AppError(status.NOT_FOUND, 'Task not found');

  if (task.createdBy.toString() !== userId) {
    throw new AppError(status.FORBIDDEN, 'Forbidden');
  }

  // Dependency rule
  if (
    taskStatus === 'Done' &&
    (!task.description || task.description.length <= 20)
  ) {
    throw new AppError(status.BAD_REQUEST, 'Description too short for Done');
  }

  const oldStatus = task.status;
  const oldPriority = task.priority;

  // Count tasks in TARGET column
  const total = await Task.countDocuments({
    createdBy: userId,
    status: taskStatus,
  });

  const safePriority = Math.max(1, Math.min(targetPriority, total + 1));

  // Close gap in OLD column
  await Task.updateMany(
    {
      createdBy: userId,
      status: oldStatus,
      priority: { $gt: oldPriority },
    },
    { $inc: { priority: -1 } },
  );

  // Make space in TARGET column
  await Task.updateMany(
    {
      createdBy: userId,
      status: taskStatus,
      priority: { $gte: safePriority },
    },
    { $inc: { priority: 1 } },
  );

  // Move task
  task.status = taskStatus;
  task.priority = safePriority;

  // Simulated failure (rollback test)
  if (Math.random() < 0.2) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Simulated backend failure',
    );
  }

  await task.save();
  return task;
};

const deleteTask = async (taskId: string, userId: string): Promise<ITask> => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(status.NOT_FOUND, 'Task not found');
  }

  if (task.createdBy.toString() !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      'You cannot delete another user’s task',
    );
  }

  await task.deleteOne();

  return task;
};

const updateTask = async (
  taskId: string,
  payload: Pick<ITask, 'title' | 'description'>,
  userId: string,
): Promise<ITask> => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(status.NOT_FOUND, 'Task not found');
  }

  if (task.createdBy.toString() !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      'You cannot update another user’s task',
    );
  }

  if (payload.title !== undefined) {
    task.title = payload.title;
  }

  if (payload.description !== undefined) {
    task.description = payload.description;
  }

  await task.save();
  return task;
};

export const taskService = {
  createTask,
  getAllTasksPerUser,
  updateTaskStatus,
  deleteTask,
  reorderTask,
  updateTask,
};
