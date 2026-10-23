import type { ReactNode } from "react";

import AppSidebar from "#/components/layouts/AppSidebar";
import SettingsDialog from "#/features/settings/components/dialog/SettingsDialog";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 items-center border-b px-4">
            <SidebarTrigger />
            <h1 className="grow text-center">App</h1>
          </header>
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
      <SettingsDialog />
    </>
  );
}
