import axios from "@/lib/axios";
import type { TaskStatus } from "./types";

export interface CreateTaskPayload {
  title: string;
  description?: string;
}

export const getTasks = async () => {
  const res = await axios.get("/tasks");
  return res.data;
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
