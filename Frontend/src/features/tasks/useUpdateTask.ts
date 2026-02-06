/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTask } from "./task.api";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated successfully");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update task"
      );
    },
  });
};
