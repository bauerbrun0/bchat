import type { Table } from "@tanstack/react-table";

import { useSelector } from "@tanstack/react-store";
import { useMemo } from "react";

import type { User } from "#/lib/auth";

import { Field, FieldLabel } from "#/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "#/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";

import type { userTableFeatures } from "./userTableFeatures";

import { userManagementStore } from "../../store";

export default function UserTablePagination({
  table,
}: {
  table: Table<typeof userTableFeatures, User>;
}) {
  const pagination = useSelector(userManagementStore, (state) => state.pagination);

  const paginationNumbers = useMemo<number[]>(() => {
    const numbers: number[] = [];
    const currentPage = pagination.pageIndex + 1;
    const pageCount = table.getPageCount();
    numbers.push(currentPage);

    for (let i = 1; i <= 2; i++) {
      if (currentPage + i <= pageCount) numbers.push(currentPage + i);
      if (currentPage - i >= 1) numbers.push(currentPage - i);
    }

    return numbers.sort((a, b) => a - b);
  }, [pagination.pageIndex, table]);

  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select
          value={pagination.pageSize}
          onValueChange={(value) => table.setPageSize(value as number)}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent zIndex={100}>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst onClick={() => table.firstPage()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={!table.getCanPreviousPage()}
              onClick={() => table.getCanPreviousPage() && table.previousPage()}
            />
          </PaginationItem>

          {paginationNumbers[0] !== 1 && (
            <PaginationItem className="hidden md:block">
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {paginationNumbers.map((n) => (
            <PaginationItem key={n} className="hidden md:block">
              <PaginationLink
                onClick={() => table.setPageIndex(n - 1)}
                isActive={pagination.pageIndex + 1 === n}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          {paginationNumbers.at(-1) !== table.getPageCount() && (
            <PaginationItem className="hidden md:block">
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              aria-disabled={!table.getCanNextPage()}
              onClick={() => table.getCanNextPage() && table.nextPage()}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast onClick={() => table.lastPage()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
