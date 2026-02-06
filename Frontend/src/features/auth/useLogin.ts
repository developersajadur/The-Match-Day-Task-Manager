/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "./auth.api";
import { toast } from "sonner";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Login successful");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    },
  });
};
