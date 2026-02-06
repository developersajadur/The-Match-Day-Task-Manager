import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/auth/auth.api";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useMe = () => {
  return useQuery<IUser>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
