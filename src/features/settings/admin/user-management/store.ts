import type { PaginationState } from "@tanstack/react-table";

import { createStore } from "@tanstack/react-store";

export const userManagementStore = createStore<
  {
    pagination: PaginationState;
  },
  {
    setPagination: (value: PaginationState) => void;
  }
>(
  {
    pagination: { pageIndex: 0, pageSize: 10 },
  },
  ({ setState }) => ({
    setPagination: (value: PaginationState) => setState((prev) => ({ ...prev, pagination: value })),
  }),
);
