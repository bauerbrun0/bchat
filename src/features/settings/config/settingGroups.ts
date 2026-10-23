import type { IconProps } from "@tabler/icons-react";

import { IconUsers } from "@tabler/icons-react";

export type SettingsGroupName = "admin";
export type SettingsItemName = "admin_user_management";

export type SettingsGroup = {
  name: SettingsGroupName;
  label: string;
  items: SettingsItem[];
};

export type SettingsItem = {
  name: SettingsItemName;
  label: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
};

export const settingGroups: SettingsGroup[] = [
  {
    name: "admin",
    label: "Admin",
    items: [{ name: "admin_user_management", label: "User Management", icon: IconUsers }],
  },
];
