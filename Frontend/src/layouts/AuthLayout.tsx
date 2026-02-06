import { Outlet } from "react-router";


export default function AuthLayout() {
  return (
    <div className="min-h-svh w-full flex items-center justify-center bg-background">
      <Outlet />
    </div>
  )
}
