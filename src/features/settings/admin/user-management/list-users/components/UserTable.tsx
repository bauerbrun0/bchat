import { useSelector } from "@tanstack/react-store";
import { useTable } from "@tanstack/react-table";
import { useTanStackTableDevtools } from "@tanstack/react-table-devtools";

import type { User } from "#/lib/auth";

import { ScrollArea, ScrollBar } from "#/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";

import { userManagementStore } from "../../store";
import { userTableColumns } from "./userTableColumns";
import { userTableFeatures } from "./userTableFeatures";
import UserTablePagination from "./UserTablePagination";

export default function UserTable({ data }: { data: { rowCount: number; users: User[] } }) {
  const pagination = useSelector(userManagementStore, (state) => state.pagination);

  const table = useTable({
    key: "admin-user-management-table",
    features: userTableFeatures,
    columns: userTableColumns,
    manualPagination: true,
    rowCount: data.rowCount,
    data: data.users,
    state: { pagination },
    onPaginationChange: (updater) =>
      userManagementStore.actions.setPagination(
        updater instanceof Function ? updater(pagination) : updater,
      ),
  });

  useTanStackTableDevtools(table);

  return (
    <div className="flex flex-col gap-4">
      <ScrollArea className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <UserTablePagination table={table} />
    </div>
  );
}
