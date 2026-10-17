import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "#/components/ui/sidebar";

export default function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader />
      <SidebarContent>
        <div>Sidebar content</div>
      </SidebarContent>
      <SidebarFooter>
        <div>user</div>
      </SidebarFooter>
    </Sidebar>
  );
}
