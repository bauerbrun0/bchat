import { createColumnHelper } from "@tanstack/react-table";

import type { User } from "#/lib/auth";

import UserAvatar from "#/components/UserAvatar";

import type { userTableFeatures } from "./userTableFeatures";

const columnHelper = createColumnHelper<typeof userTableFeatures, User>();

export const userTableColumns = columnHelper.columns([
  columnHelper.accessor("username", {
    header: "Username",
    cell: ({ row }) => {
      const username = row.getValue("username") as string;
      return (
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <UserAvatar seed={username} />
          </div>
          <span>{username}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("displayUsername", {
    header: "Display Name",
  }),
  columnHelper.accessor("role", {
    header: "Role",
  }),
  columnHelper.accessor("createdAt", {
    header: "Created",
    cell: ({ row }) => {
      const created = new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "medium",
        hour12: false,
      }).format(row.getValue("createdAt") as Date);
      return created;
    },
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated",
    cell: ({ row }) => {
      const created = new Intl.DateTimeFormat("en-US", {
        dateStyle: "short",
        timeStyle: "medium",
        hour12: false,
      }).format(row.getValue("updatedAt") as Date);
      return created;
    },
  }),
]);
