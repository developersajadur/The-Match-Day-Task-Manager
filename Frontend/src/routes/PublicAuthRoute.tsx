import { Navigate, Outlet } from "react-router";
import { useMe } from "@/features/auth/useMe";

export default function PublicAuthRoute() {
  const { data: user, isLoading } = useMe();

  if (isLoading) return null;

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === "user") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
