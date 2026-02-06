import { Navigate, Outlet } from "react-router";
import { useEffect } from "react";
import { useMe } from "@/features/auth/useMe";
import { useLogout } from "@/features/auth/useLogout";
import Loader from "@/components/common/Loader";

type ProtectedRouteProps = {
  allowedRoles?: ("user" | "admin")[];
};

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { data: user, isLoading } = useMe();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        logout();
      }

      if (
        user &&
        allowedRoles &&
        !allowedRoles.includes(user.role)
      ) {
        logout();
      }
    }
  }, [user, isLoading, allowedRoles, logout]);

  if (isLoading) {
    return <Loader/>
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
