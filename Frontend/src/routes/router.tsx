import { createBrowserRouter } from "react-router";

import PublicAuthRoute from "./PublicAuthRoute";

import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import UserLayout from "@/layouts/UserLayout";
import ProtectedRoute from "./protectedRoutes";

const router = createBrowserRouter([
{
  element: <ProtectedRoute allowedRoles={["user"]} />,
  children: [
    {
      element: <UserLayout />,
      children: [
        { path: "/dashboard", element: <UserDashboardHome /> },
        {
          path: "/dashboard/categories/:id",
          element: <UserCategoryNotifications />,
        },
        {
  path: "/dashboard/categories",
  element: <CategoryBrowse />,
}
      ],
    },
  ],
},

  {
    element: <PublicAuthRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
    ],
  },
]);

export default router;
