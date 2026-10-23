import { useIsMobile } from "#/components/hooks/use-mobile";
import { Sidebar, SidebarContent, SidebarFooter } from "#/components/ui/sidebar";

import { settingGroups } from "../../config/settingGroups";
import SettingsSidebarGroup from "./SettingsSidebarGroup";

export default function SettingsSidebar() {
  const isMobile = useIsMobile();

  return (
    <Sidebar className="flex h-full" settingsSidebar collapsible={isMobile ? "offcanvas" : "none"}>
      <SidebarContent>
        {settingGroups.map((group, i) => (
          <SettingsSidebarGroup group={group} key={i} />
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
