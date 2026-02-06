import { Types } from 'mongoose';

export type TTaskStatus = 'To-Do' | 'In-Progress' | 'Done';

export interface ITask {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  status: TTaskStatus;
  priority: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
