import { useSelector } from "@tanstack/react-store";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#/components/ui/sidebar";

import type { SettingsGroup } from "../../config/settingGroups";

import { settingsStore } from "../../store";

export default function SettingsSidebarGroup({ group }: { group: SettingsGroup }) {
  const selectedItem = useSelector(settingsStore, (state) => state.selectedSettingsItem);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton
                onClick={() => settingsStore.actions.setSelectedSettingsItem(item.name)}
                isActive={item.name === selectedItem.name}
                render={
                  <button className="text-foreground">
                    <item.icon />
                    <span>{item.label}</span>
                  </button>
                }
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
