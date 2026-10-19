import { useSelector } from "@tanstack/react-store";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "#/components/ui/dialog";

import { settingsStore } from "../store";

export default function SettingsDialog() {
  const open = useSelector(settingsStore, (state) => state.dialogOpen);

  return (
    <Dialog open={open} onOpenChange={settingsStore.actions.setDialogOpen}>
      <DialogContent className="flex min-h-[85dvh] min-w-[calc(100vw-2rem)] flex-col md:min-w-[85vw]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="min-h-full min-w-full grow">
          <p>Settings</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
