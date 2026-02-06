import { Schema, model } from 'mongoose';
import { ITask } from './task.interface';

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['To-Do', 'In-Progress', 'Done'],
      default: 'To-Do',
    },
    priority: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'CreatedBy (User) is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = model<ITask>('Task', taskSchema);
