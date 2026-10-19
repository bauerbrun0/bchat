import { createStore } from "@tanstack/react-store";

export const settingsStore = createStore(
  {
    dialogOpen: false,
  },
  ({ setState }) => ({
    setDialogOpen: (value: boolean) => setState((prev) => ({ ...prev, dialogOpen: value })),
  }),
);
