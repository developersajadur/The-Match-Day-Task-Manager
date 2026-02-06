import httpStatus from 'http-status';
import { taskService } from './task.service';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';



const createTask = catchAsync(async (req, res) => {
  const userId = req.user.userId;

  const task = await taskService.createTask(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});


const getAllTasksPerUser = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const tasks = await taskService.getAllTasksPerUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tasks fetched successfully',
    data: tasks,
  });
});

const updateTaskStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
    const userId = req.user.userId;
  const { status: newStatus } = req.body;

  const task = await taskService.updateTaskStatus(id, newStatus, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task status updated successfully',
    data: task,
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

   await taskService.deleteTask(id, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task deleted successfully',
    data: null,
  });
});

const reorderTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status, targetPriority } = req.body;
  const userId = req.user.userId;

  const task = await taskService.reorderTask(
    id,
    status,
    targetPriority,
    userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task reordered successfully',
    data: task,
  });
});

const updateTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const task = await taskService.updateTask(id, req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});




export const taskController = {
  createTask,
  getAllTasksPerUser,
  updateTaskStatus,
  deleteTask,
  reorderTask,
  updateTask
};
