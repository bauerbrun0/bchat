import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";

import { newUserSchema } from "#/schemas/user";
import serverInfoService from "#/services/serverInfoService";
import userService from "#/services/userService";

import { initializedServerProcedure, uninitializedServerProcedure } from "../procedures";

const usersRouter = {
  getAll: initializedServerProcedure.query(async () => {
    return await userService.getAll();
  }),
  getById: initializedServerProcedure.input(z.number()).query(async ({ input }) => {
    const user = await userService.getById(input);
    return user;
  }),
  create: initializedServerProcedure.input(newUserSchema).mutation(async ({ input }) => {
    const user = await userService.create(input);
    return user;
  }),
  createInitialAdminUser: uninitializedServerProcedure
    .input(newUserSchema)
    .mutation(async ({ input }) => {
      const user = await userService.createInitialAdminUser(input);
      await serverInfoService.refreshIsInitialized();
      return user;
    }),
} satisfies TRPCRouterRecord;

export default usersRouter;
