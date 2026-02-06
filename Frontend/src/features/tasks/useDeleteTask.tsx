/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTask } from "./task.api";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete task"
      );
    },
  });
};
