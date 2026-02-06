import axios from "@/lib/axios";
import type { TaskStatus } from "./types";

export interface CreateTaskPayload {
  title: string;
  description?: string;
}

export const getTasks = async () => {
  const res = await axios.get("/tasks");
  return res.data.data;
};

export const createTask = async (payload: CreateTaskPayload) => {
  const res = await axios.post("/tasks", payload);
  return res.data;
};

export const updateTaskStatus = async ({
  id,
  status,
}: {
  id: string;
  status: TaskStatus;
}) => {
  const res = await axios.patch(`/tasks/${id}/status`, { status });
  return res.data;
};


export const deleteTask = async (id: string) => {
  const res = await axios.delete(`/tasks/${id}`);
  return res.data;
};



export interface UpdateTaskPayload {
  title: string;
  description?: string;
}

export const updateTask = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateTaskPayload;
}) => {
  const res = await axios.patch(`/tasks/${id}`, payload);
  return res.data;
};