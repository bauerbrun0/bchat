import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";

import { loginSchema, newUserSchema } from "#/schemas/user";
import serverInfoService from "#/services/serverInfoService";
import userService from "#/services/userService";

import { initializedServerProcedure, uninitializedServerProcedure } from "../procedures";

const usersRouter = {
  getAll: initializedServerProcedure.query(async () => {
    return await userService.getAll();
  }),
  getById: initializedServerProcedure.input(z.string()).query(async ({ input }) => {
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
  loginUser: initializedServerProcedure.input(loginSchema).mutation(async ({ input }) => {
    console.log(input);
    throw new Error("Not implemented.");
  }),
} satisfies TRPCRouterRecord;

export default usersRouter;
