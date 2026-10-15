import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";

import { newUserSchema } from "#/schemas/user";
import serverInfoService from "#/services/serverInfoService";
import userService from "#/services/userService";

import { authenticatedProcedure, uninitializedServerProcedure } from "../procedures";

const usersRouter = {
  getAll: authenticatedProcedure.query(async () => {
    return await userService.getAll();
  }),
  getById: authenticatedProcedure.input(z.string()).query(async ({ input }) => {
    const user = await userService.getById(input);
    return user;
  }),
  createInitialAdminUser: uninitializedServerProcedure
    .input(newUserSchema)
    .mutation(async ({ input }) => {
      const user = await userService.createInitialAdmin(input);
      await serverInfoService.refreshIsInitialized();
      return user;
    }),
} satisfies TRPCRouterRecord;

export default usersRouter;
