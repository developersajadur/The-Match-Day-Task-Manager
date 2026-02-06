/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTaskStatus } from "./task.api";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task status updated");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update task"
      );
    },
  });
};
