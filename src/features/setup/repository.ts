import { count, eq } from "drizzle-orm";

import type { Transaction } from "#/db";

import { db } from "#/db";
import { user as userTable } from "#/db/schema/auth";

type User = typeof userTable.$inferSelect;

async function getAdminUserCount({ tx }: { tx?: Transaction } = {}): Promise<number> {
  const client = tx ?? db;
  const result = await client
    .select({ count: count() })
    .from(userTable)
    .where(eq(userTable.role, "admin"));

  return result[0].count;
}

async function setUserRole(userId: string, role: "user" | "admin"): Promise<User | null> {
  const user = await db.update(userTable).set({ role }).where(eq(userTable.id, userId)).returning();
  if (user.length === 0) {
    return null;
  }
  return user[0];
}

export default {
  getAdminUserCount,
  setUserRole,
};
