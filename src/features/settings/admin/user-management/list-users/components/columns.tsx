import { useSelector } from "@tanstack/react-store";
import { createColumnHelper } from "@tanstack/react-table";
import { z } from "zod";

import type { User } from "#/lib/auth";

import UserAvatar from "#/components/UserAvatar";
import { role } from "#/lib/schemas/user";

import type { userTableFeatures } from "./features";

import { listUsersStore } from "../store";
import DateRangeFilterPopover from "./DateRangeFilterPopover";
import MultiSelectFilterPopover from "./MultiSelectFilterPopover";
import SortButton from "./SortButton";
import TextFilterPopover from "./TextFilterPopover";

const columnHelper = createColumnHelper<typeof userTableFeatures, User>();

export const userTableColumns = columnHelper.columns([
  columnHelper.accessor("username", {
    header: () => {
      const storedUsernameFilter = useSelector(listUsersStore, (state) => state.usernameFilter);

      return (
        <div className="flex items-center justify-between gap-2">
          <SortButton field="username" label="Username" />
          <TextFilterPopover
            storedFilter={storedUsernameFilter}
            storeFilter={listUsersStore.actions.setUsernameFilter}
          />
        </div>
      );
    },
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
    header: () => {
      const storedDisplayUsernameFilter = useSelector(
        listUsersStore,
        (state) => state.displayUsernameFilter,
      );

      return (
        <div className="flex items-center justify-between gap-2">
          <SortButton field="displayUsername" label="Display Name" />
          <TextFilterPopover
            storedFilter={storedDisplayUsernameFilter}
            storeFilter={listUsersStore.actions.setDisplayUsernameFilter}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor("role", {
    header: () => {
      const storedRoleFilter = useSelector(listUsersStore, (state) => state.roleFilter);

      return (
        <div className="flex items-center justify-between gap-2">
          <SortButton field="role" label="Role" />
          <MultiSelectFilterPopover
            items={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
            ]}
            storedFilter={storedRoleFilter}
            storeFilter={(value) => {
              const { data, error } = z.array(role).safeParse(value);
              if (error) {
                listUsersStore.actions.setRoleFilter(undefined);
              } else {
                listUsersStore.actions.setRoleFilter(data);
              }
            }}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    header: () => {
      const storedCreatedFilter = useSelector(listUsersStore, (state) => state.createdAtFilter);

      return (
        <div className="flex items-center justify-between gap-2">
          <SortButton field="createdAt" label="Created" />
          <DateRangeFilterPopover
            storedFilter={storedCreatedFilter}
            storeFilter={listUsersStore.actions.setCreatedAtFilter}
          />
        </div>
      );
    },
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
    header: () => {
      const storedUpdatedFilter = useSelector(listUsersStore, (state) => state.updatedAtFilter);

      return (
        <div className="flex items-center justify-between gap-2">
          <SortButton field="updatedAt" label="Updated" />
          <DateRangeFilterPopover
            storedFilter={storedUpdatedFilter}
            storeFilter={listUsersStore.actions.setUpdatedAtFilter}
          />
        </div>
      );
    },
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
