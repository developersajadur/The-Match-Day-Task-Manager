import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "./auth.api";
import { toast } from "sonner";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["me"] });
      

      toast.success("Logged out successfully");

    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
};
