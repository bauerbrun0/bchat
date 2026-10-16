import { eq } from "drizzle-orm";

import { db } from "#/db";
import { user as userTable } from "#/db/schema/auth";

export type User = typeof userTable.$inferSelect;

async function getAll(): Promise<User[]> {
  return await db.select().from(userTable);
}

async function getById(id: string): Promise<User | null> {
  const user = await db.select().from(userTable).where(eq(userTable.id, id));
  if (user.length === 0) {
    return null;
  }
  return user[0];
}

export default {
  getAll,
  getById,
};
