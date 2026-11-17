import type { PaginationState } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";

import { createStore } from "@tanstack/react-store";

import type { Role } from "#/lib/schemas/user";

import type { Sort, Field } from "../schema";

export const listUsersStore = createStore<
  {
    pagination: PaginationState;
    usernameFilter?: string | undefined;
    displayUsernameFilter?: string | undefined;
    roleFilter?: Role[] | undefined;
    createdAtFilter?: DateRange | undefined;
    updatedAtFilter?: DateRange | undefined;
    sort: Sort | undefined;
  },
  {
    setPagination: (value: PaginationState) => void;
    setUsernameFilter: (value: string | undefined) => void;
    setDisplayUsernameFilter: (value: string | undefined) => void;
    setRoleFilter: (value: Role[] | undefined) => void;
    setCreatedAtFilter: (value: DateRange | undefined) => void;
    setUpdatedAtFilter: (value: DateRange | undefined) => void;
    toggleSort: (field: Field) => void;
  }
>(
  {
    pagination: { pageIndex: 0, pageSize: 10 },
    usernameFilter: undefined,
    displayUsernameFilter: undefined,
    roleFilter: undefined,
    createdAtFilter: undefined,
    updatedAtFilter: undefined,
    sort: undefined,
  },
  ({ setState }) => ({
    setPagination: (value: PaginationState) => setState((prev) => ({ ...prev, pagination: value })),
    setUsernameFilter: (value: string | undefined) =>
      setState((prev) => ({ ...prev, usernameFilter: value })),
    setDisplayUsernameFilter: (value: string | undefined) =>
      setState((prev) => ({ ...prev, displayUsernameFilter: value })),
    setRoleFilter: (value: Role[] | undefined) =>
      setState((prev) => ({ ...prev, roleFilter: value })),
    setCreatedAtFilter: (value: DateRange | undefined) =>
      setState((prev) => ({ ...prev, createdAtFilter: value })),
    setUpdatedAtFilter: (value: DateRange | undefined) =>
      setState((prev) => ({ ...prev, updatedAtFilter: value })),
    toggleSort: (field: Field) =>
      setState((prev) => {
        if (!prev.sort || prev.sort.by !== field) {
          return {
            ...prev,
            sort: { by: field, order: "asc" },
          };
        }

        if (prev.sort.order === "asc") {
          return {
            ...prev,
            sort: { by: field, order: "desc" },
          };
        }

        return {
          ...prev,
          sort: undefined,
        };
      }),
  }),
);
