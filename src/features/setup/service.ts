import type { User } from "#/lib/auth";

import { auth } from "#/lib/auth";
import logger from "#/lib/logger";

import type { InitialAdmin } from "./schema";

import repository from "./repository";

let isInitialized: boolean | null = null;

const log = logger.child({ module: "initService" });

async function getIsInitialized(): Promise<boolean> {
  if (isInitialized === null) {
    isInitialized = (await repository.getAdminUserCount()) > 0;
  }
  return isInitialized;
}

async function refreshIsInitialized() {
  isInitialized = (await repository.getAdminUserCount()) > 0;
}

async function createInitialAdmin(admin: InitialAdmin): Promise<User> {
  const { user: createdUser } = await auth.api.signUpEmail({
    body: {
      email: `${admin.username}@users.invalid`,
      username: admin.username,
      password: admin.password,
      name: "",
    },
  });
  const createdAdmin = await repository.setUserRole(createdUser.id, "admin");
  if (createdAdmin === null) {
    log.error("initial_admin_not_found");
    throw new Error("Couldn't find the created admin");
  }
  log.info("initial_admin_user_created", { user: createdAdmin });
  await refreshIsInitialized();
  return createdAdmin;
}

export default {
  getIsInitialized,
  createInitialAdmin,
};
