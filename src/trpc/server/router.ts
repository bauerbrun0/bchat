import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";

import { newUserSchema } from "#/schemas/user";
import userService from "#/services/userService";

import { router, publicProcedure } from "./init";

const usersRouter = {
  getAll: publicProcedure.query(async () => {
    return await userService.getAll();
  }),
  getById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const user = await userService.getById(input);
    return user;
  }),
  create: publicProcedure.input(newUserSchema).mutation(async (opts) => {
    const { input } = opts;
    const user = await userService.create(input);
    return user;
  }),
} satisfies TRPCRouterRecord;

export const trpcRouter = router({
  users: usersRouter,
});

export type TRPCRouter = typeof trpcRouter;
