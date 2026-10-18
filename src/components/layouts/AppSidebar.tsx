import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "#/components/ui/sidebar";

import UserDropdownMenu from "./UserDropdownMenu";

export default function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader />
      <SidebarContent>
        <div>Sidebar content</div>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdownMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
