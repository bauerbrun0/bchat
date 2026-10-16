import type { User } from "#/lib/auth";

import type { User as DBUser } from "./repository";

import repository from "./repository";

async function getAll(): Promise<User[]> {
  const users = await repository.getAll();
  return users.map(toUser);
}

async function getById(id: string): Promise<User | null> {
  const user = await repository.getById(id);
  return user ? toUser(user) : null;
}

function toUser(user: DBUser): User {
  return {
    ...user,
    role: user.role as "user" | "admin",
  };
}

export default {
  getAll,
  getById,
};
