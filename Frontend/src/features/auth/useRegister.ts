/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { register } from "@/features/auth/auth.api";
import { toast } from "sonner";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Registration failed"
      );
    },
  });
};
