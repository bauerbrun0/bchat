import argon2 from "argon2";
import { z } from "zod";

import { db } from "#/db";
import logger from "#/lib/logger";
import userRepository from "#/repositories/userRepository";
import { userSchema, newUserSchema } from "#/schemas/user";

import { AdminUserAlreadyExistsError, InitialUserNotAdminError, PasswordHashError } from "./errors";

const log = logger.child({ module: "userService" });

export type User = z.infer<typeof userSchema>;
export type SafeUser = Omit<User, "passwordHash">;
export type NewUser = z.infer<typeof newUserSchema>;

async function getAll(): Promise<SafeUser[]> {
  const users = await userRepository.getAll();
  return users.map(toSafeUser);
}

async function getById(id: number): Promise<User | null> {
  return await userRepository.getById(id);
}

async function create(user: NewUser): Promise<SafeUser> {
  const createdUser = await userRepository.create({
    user: {
      username: user.username,
      isAdmin: user.isAdmin,
      passwordHash: await hashPassword(user.password),
      createdAt: new Date(),
    },
  });
  return toSafeUser(createdUser);
}

async function createInitialAdminUser(user: NewUser): Promise<SafeUser> {
  if (user.isAdmin === false) {
    throw new InitialUserNotAdminError();
  }
  return await db.transaction(async (tx) => {
    const isServerInitialized = (await userRepository.getAdminUserCount({ tx })) > 0;
    if (isServerInitialized) {
      throw new AdminUserAlreadyExistsError();
    }
    const createdUser = await userRepository.create({
      tx,
      user: {
        username: user.username,
        isAdmin: true,
        passwordHash: await hashPassword(user.password),
        createdAt: new Date(),
      },
    });
    return toSafeUser(createdUser);
  });
}

async function hashPassword(password: string) {
  try {
    return await argon2.hash(password);
  } catch (error: unknown) {
    if (error instanceof Error) {
      log.error("Password hashing failed", { error: error.message });
    }
    throw new PasswordHashError();
  }
}

function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
}

export default {
  getAll,
  getById,
  create,
  createInitialAdminUser,
};
