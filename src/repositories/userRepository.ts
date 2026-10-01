import { eq, isNull } from "drizzle-orm";

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

async function create(user: NewUser): Promise<User> {
  const createdUser = await db.insert(usersTable).values(user).returning();
  if (createdUser.length === 0) {
    throw new Error("userRepository: couldn't create user");
  }
  return createdUser[0];
}

export default {
  getAll,
  getById,
  create,
};
