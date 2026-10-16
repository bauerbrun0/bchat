import type { User } from "#/lib/auth";
import type { NewUser } from "#/lib/schemas/user";
import type { User as DBUser } from "#/repositories/userRepository";

import { auth } from "#/lib/auth";
import logger from "#/lib/logger";
import userRepository from "#/repositories/userRepository";

import { UserNotFoundError } from "./errors";

const log = logger.child({ module: "userService" });

async function getAll(): Promise<User[]> {
  const users = await userRepository.getAll();
  return users.map(toUser);
}

async function getById(id: string): Promise<User | null> {
  const user = await userRepository.getById(id);
  return user ? toUser(user) : null;
}

async function createInitialAdmin(user: NewUser): Promise<User> {
  const { id } = await signUp(user);
  const createdAdmin = await userRepository.setUserRole(id, "admin");
  if (createdAdmin === null) {
    log.error("initial_admin_not_found");
    throw new UserNotFoundError();
  }
  log.info("initial_admin_user_created", { user: createdAdmin });
  return createdAdmin;
}

async function signUp(user: NewUser): Promise<User> {
  const result = await auth.api.signUpEmail({
    body: {
      email: `${user.username}@users.invalid`,
      username: user.username,
      password: user.password,
      name: "",
    },
  });

  return result.user;
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
  createInitialAdmin,
};
