import type { SQL } from "drizzle-orm";

import { and, count, eq, gte, lte, ilike, or, asc, desc } from "drizzle-orm";

import { db } from "#/db";
import { user as userTable } from "#/db/schema/auth";

import type { ListUsersOpts } from "./schema";

export type User = typeof userTable.$inferSelect;

async function listUsers({
  limit,
  offset,
  usernameFilter,
  displayUsernameFilter,
  roleFilter,
  createdAtFilter,
  updatedAtFilter,
  sort,
}: ListUsersOpts): Promise<{ rowCount: number; users: User[] }> {
  return db.transaction(
    async (tx) => {
      let rowCountQuery = tx.select({ rowCount: count() }).from(userTable).$dynamic();
      let usersQuery = tx.select().from(userTable).limit(limit).offset(offset).$dynamic();

      let filters: SQL<unknown>[] = [];

      if (usernameFilter) {
        filters.push(ilike(userTable.username, `%${usernameFilter}%`));
      }

      if (displayUsernameFilter) {
        filters.push(ilike(userTable.displayUsername, `%${displayUsernameFilter}%`));
      }

      if (roleFilter) {
        let roleFilters: SQL<unknown>[] = [];
        roleFilter.forEach((role) => {
          roleFilters.push(eq(userTable.role, role));
        });
        const roleOrClause = or(...roleFilters);
        if (roleOrClause) filters.push(roleOrClause);
      }

      if (createdAtFilter && createdAtFilter.from && createdAtFilter.to) {
        filters.push(
          gte(userTable.createdAt, createdAtFilter.from),
          lte(userTable.createdAt, createdAtFilter.to),
        );
      }

      if (updatedAtFilter && updatedAtFilter.from && updatedAtFilter.to) {
        filters.push(
          gte(userTable.updatedAt, updatedAtFilter.from),
          lte(userTable.updatedAt, updatedAtFilter.to),
        );
      }

      const whereClause = and(...filters);

      if (whereClause) {
        rowCountQuery = rowCountQuery.where(whereClause);
        usersQuery = usersQuery.where(whereClause);
      }

      if (sort) {
        usersQuery = usersQuery.orderBy(
          sort.order === "asc" ? asc(userTable[sort.by]) : desc(userTable[sort.by]),
        );
      } else {
        usersQuery = usersQuery.orderBy(userTable.createdAt);
      }

      const [{ rowCount }] = await rowCountQuery;
      const users = await usersQuery;
      return { users, rowCount };
    },
    { isolationLevel: "repeatable read" },
  );
}

export default {
  listUsers,
};
