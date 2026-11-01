import { useSelector } from "@tanstack/react-store";
import { cn } from "cn";

import { useIsMobile } from "#/components/hooks/use-mobile";
import { Dialog, DialogContent } from "#/components/ui/dialog";
import { ScrollArea } from "#/components/ui/scroll-area";
import { SidebarProvider } from "#/components/ui/sidebar";

import UserManagementSettings from "../../admin/user-management/components/UserManagementSettings";
import { settingsStore } from "../../store";
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
        <SidebarProvider
          className="min-h-0! min-w-0!"
          style={
            {
              "--sidebar-width": "15rem",
            } as React.CSSProperties
          }
        >
          <SettingsSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <SettingsDialogHeader />
            <main className="flex min-h-0 flex-1 flex-col px-4 lg:px-40">
              <ScrollArea className="flex min-h-0 flex-1 px-3 md:px-5">
                {selectedItem.name === "admin_user_management" && <UserManagementSettings />}
              </ScrollArea>
            </main>
          </div>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
