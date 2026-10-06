import { and, count, eq, isNull } from "drizzle-orm";

import type { Transaction } from "#/db";

import { db } from "#/db";
import { usersTable } from "#/db/schema";

export type NewUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;

async function getAll(): Promise<User[]> {
  return await db.select().from(usersTable).where(isNull(usersTable.deletedAt));
}

async function getById(id: number): Promise<User | null> {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
  if (user.length === 0) {
    return null;
  }
  return user[0];
}

async function create({ tx, user }: { tx?: Transaction; user: NewUser }): Promise<User> {
  const client = tx ?? db;
  const createdUser = await client.insert(usersTable).values(user).returning();
  if (createdUser.length === 0) {
    throw new Error("userRepository: couldn't create user");
  }
  return createdUser[0];
}

async function getAdminUserCount({ tx }: { tx?: Transaction } = {}): Promise<number> {
  const client = tx ?? db;
  const result = await client
    .select({ count: count() })
    .from(usersTable)
    .where(and(eq(usersTable.isAdmin, true), isNull(usersTable.deletedAt)));

  return result[0].count;
}

export default {
  getAll,
  getById,
  create,
  getAdminUserCount,
};
