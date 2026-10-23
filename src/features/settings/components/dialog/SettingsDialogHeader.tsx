import { IconX } from "@tabler/icons-react";
import { useSelector } from "@tanstack/react-store";

import { useIsMobile } from "#/components/hooks/use-mobile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb";
import { Button } from "#/components/ui/button";
import { DialogHeader } from "#/components/ui/dialog";
import { SidebarTrigger } from "#/components/ui/sidebar";

import { settingsStore } from "../../store";

export default function SettingsDialogHeader() {
  const selectedGroup = useSelector(settingsStore, (state) => state.selectedSettingsGroup);
  const selectedItem = useSelector(settingsStore, (state) => state.selectedSettingsItem);
  const isMobile = useIsMobile();

  return (
    <DialogHeader className="my-6 flex flex-row items-center gap-4">
      {isMobile && <SidebarTrigger />}
      <div className="grow">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-muted-foreground">Settings</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-muted-foreground">
                {selectedGroup.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedItem.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => settingsStore.actions.setDialogOpen(false)}
      >
        <IconX />
      </Button>
    </DialogHeader>
  );
}
