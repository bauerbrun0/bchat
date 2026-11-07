import { count } from "drizzle-orm";

import { db } from "#/db";
import { user as userTable } from "#/db/schema/auth";

import type { ListUsersOpts } from "./schema";

export type User = typeof userTable.$inferSelect;

async function listUsers({
  limit,
  offset,
}: ListUsersOpts): Promise<{ rowCount: number; users: User[] }> {
  return await db.transaction(async (tx) => {
    const result = await tx.select({ rowCount: count() }).from(userTable);
    const rowCount = result[0].rowCount;
    const users = await tx
      .select()
      .from(userTable)
      .orderBy(userTable.id)
      .limit(limit)
      .offset(offset);
    return { users, rowCount };
  });
}

export default {
  listUsers,
};
