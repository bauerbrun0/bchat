import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";

import { newUser, type User } from "#/types/user";

import { router, publicProcedure } from "./init";

let users: User[] = [{ id: 1, username: "bruno" }];

const usersRouter = {
  list: publicProcedure.query(async () => {
    return users;
  }),
  getById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const user = users.find((u) => u.id == input) as User;
    return user;
  }),
  create: publicProcedure.input(newUser).mutation(async (opts) => {
    const { input } = opts;
    const user = { id: 2, ...input };
    users.push(user);
    return user;
  }),
} satisfies TRPCRouterRecord;

export const trpcRouter = router({
  users: usersRouter,
});

export type TRPCRouter = typeof trpcRouter;
