import type { PaginationState } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";

import { createStore } from "@tanstack/react-store";

export const listUsersStore = createStore<
  {
    pagination: PaginationState;
    usernameFilter?: string | undefined;
    displayUsernameFilter?: string | undefined;
    roleFilter?: ("user" | "admin")[] | undefined;
    createdFilter?: DateRange | undefined;
    updatedFilter?: DateRange | undefined;
  },
  {
    setPagination: (value: PaginationState) => void;
    setUsernameFilter: (value: string | undefined) => void;
    setDisplayUsernameFilter: (value: string | undefined) => void;
    setRoleFilter: (value: ("user" | "admin")[] | undefined) => void;
    setCreatedFilter: (value: DateRange | undefined) => void;
    setUpdatedFilter: (value: DateRange | undefined) => void;
  }
>(
  {
    pagination: { pageIndex: 0, pageSize: 10 },
    usernameFilter: undefined,
    displayUsernameFilter: undefined,
    roleFilter: undefined,
    createdFilter: undefined,
    updatedFilter: undefined,
  },
  ({ setState }) => ({
    setPagination: (value: PaginationState) => setState((prev) => ({ ...prev, pagination: value })),
    setUsernameFilter: (value: string | undefined) =>
      setState((prev) => ({ ...prev, usernameFilter: value })),
    setDisplayUsernameFilter: (value: string | undefined) =>
      setState((prev) => ({ ...prev, displayUsernameFilter: value })),
    setRoleFilter: (value: ("user" | "admin")[] | undefined) =>
      setState((prev) => ({ ...prev, roleFilter: value })),
    setCreatedFilter: (value: DateRange | undefined) =>
      setState((prev) => ({ ...prev, createdFilter: value })),
    setUpdatedFilter: (value: DateRange | undefined) =>
      setState((prev) => ({ ...prev, updatedFilter: value })),
  }),
);
