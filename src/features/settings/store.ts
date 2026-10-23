import { createStore } from "@tanstack/react-store";

import type { SettingsGroup, SettingsItem, SettingsItemName } from "./config/settingGroups";

import { settingGroups } from "./config/settingGroups";

const initialSettingsGroup = settingGroups.find((g) => g.name === "admin") as SettingsGroup;
const initialSettingsItem = initialSettingsGroup.items.find(
  (i) => i.name === "admin_user_management",
) as SettingsItem;

export const settingsStore = createStore<
  {
    dialogOpen: boolean;
    selectedSettingsGroup: SettingsGroup;
    selectedSettingsItem: SettingsItem;
  },
  {
    setDialogOpen: (value: boolean) => void;
    setSelectedSettingsItem: (name: SettingsItemName) => void;
  }
>(
  {
    dialogOpen: false,
    selectedSettingsGroup: initialSettingsGroup,
    selectedSettingsItem: initialSettingsItem,
  },
  ({ setState }) => ({
    setDialogOpen: (value: boolean) => setState((prev) => ({ ...prev, dialogOpen: value })),
    setSelectedSettingsItem: (name: SettingsItemName) =>
      setState((prev) => {
        for (const group of settingGroups) {
          const foundItem = group.items.find((item) => item.name === name);
          if (foundItem) {
            return {
              ...prev,
              selectedSettingsGroup: group,
              selectedSettingsItem: foundItem,
            };
          }
        }
        return prev;
      }),
  }),
);
