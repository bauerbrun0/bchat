import type { User } from "#/lib/auth";

import type { User as DBUser } from "./repository";
import type { ListUsersOpts } from "./schema";

import repository from "./repository";

async function listUsers(opts: ListUsersOpts): Promise<{ rowCount: number; users: User[] }> {
  const result = await repository.listUsers(opts);
  return { ...result, users: result.users.flatMap(toUser) };
}

function toUser(user: DBUser): User {
  return {
    ...user,
    username: user.username ?? "",
  };
}

export default {
  listUsers,
};
