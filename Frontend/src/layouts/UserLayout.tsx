
import { Outlet } from "react-router";
import { UserSidebar } from "@/components/common/UserSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function UserLayout() {

  return (
    <SidebarProvider>
      <UserSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger id="sidebarTrigger" />
          <Separator orientation="vertical" className="h-4" />
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
