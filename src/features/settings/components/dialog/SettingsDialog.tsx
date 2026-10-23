import { useSelector } from "@tanstack/react-store";
import { cn } from "cn";

import { useIsMobile } from "#/components/hooks/use-mobile";
import { Dialog, DialogContent } from "#/components/ui/dialog";
import { SidebarProvider } from "#/components/ui/sidebar";

import { settingsStore } from "../../store";
import UserManagementSettings from "../admin/user-management/UserManagementSettings";
import SettingsSidebar from "../sidebar/SettingsSidebar";
import SettingsDialogHeader from "./SettingsDialogHeader";

export default function SettingsDialog() {
  const open = useSelector(settingsStore, (state) => state.dialogOpen);
  const selectedItem = useSelector(settingsStore, (state) => state.selectedSettingsItem);
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={settingsStore.actions.setDialogOpen}>
      <DialogContent
        className={cn(
          "h-dvh min-w-full overflow-hidden p-0 md:h-[85dvh] md:min-w-[85vw]",
          isMobile ? "rounded-none" : "",
        )}
        showCloseButton={false}
      >
        <div className="h-full w-full">
          <SidebarProvider className="h-full w-full items-start">
            <SettingsSidebar />
            <div className="w-full px-6">
              <SettingsDialogHeader />
              <main>
                {selectedItem.name === "admin_user_management" && <UserManagementSettings />}
              </main>
            </div>
          </SidebarProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
