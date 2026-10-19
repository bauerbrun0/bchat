import { IconDotsVertical, IconLogout, IconSettings } from "@tabler/icons-react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "#/components/ui/sidebar";
import { toast } from "#/components/ui/toast";
import UserAvatar from "#/components/UserAvatar";
import { settingsStore } from "#/features/settings/store";
import { authClient } from "#/lib/auth/client";

export default function UserDropdownMenu() {
  const { isMobile } = useSidebar();
  const { user } = getRouteApi("/_authed").useRouteContext();

  const navigate = useNavigate();

  async function onClickLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await navigate({ to: "/login" });
        },
        onError: ({ error }) => {
          toast.add({
            type: "error",
            title: "Couldn't sign you out.",
            description: error.message,
          });
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="h-8 w-8 overflow-hidden rounded-lg md:h-9 md:w-9">
              <UserAvatar seed={user.username as string} animate />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.displayUsername}</span>
              <span className="truncate text-xs text-muted-foreground">{user.username}</span>
            </div>
            <IconDotsVertical className="ml-auto size-4" />
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="end" sideOffset={10}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <div className="h-8 w-8 overflow-hidden rounded-lg">
                <UserAvatar seed={user.username as string} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.displayUsername}</span>
                <span className="truncate text-xs text-muted-foreground">{user.username}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => settingsStore.actions.setDialogOpen(true)}>
              <IconSettings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onClickLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
