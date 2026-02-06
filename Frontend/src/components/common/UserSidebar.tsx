import { ListTodo } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarHeaders } from "./SidebarHeader";
import { NavUser } from "./NavUser";
import { useMe } from "@/features/auth/useMe";
import { useNavigate } from "react-router";

export function UserSidebar() {
  const navigate = useNavigate();
  const { data: user } = useMe();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeaders />

      <SidebarContent>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Tasks"
              onClick={() => navigate("/dashboard/tasks")}
              className="group-data-[collapsible=icon]:justify-center"
            >
              <ListTodo className="shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">
                Tasks
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
