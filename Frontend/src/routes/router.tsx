import { createBrowserRouter, Navigate } from "react-router";

import PublicAuthRoute from "./PublicAuthRoute";
import ProtectedRoute from "./protectedRoutes";

import AuthLayout from "@/layouts/AuthLayout";
import UserLayout from "@/layouts/UserLayout";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import TasksPage from "@/pages/Tasks";

const router = createBrowserRouter([
    {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  {
    element: <ProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: "/dashboard/tasks",
            element: <TasksPage />,
          },

          // Optional: redirect dashboard root → tasks
          {
            path: "/dashboard",
            element: <TasksPage />,
          },
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
