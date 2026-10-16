import type { TRPCRouterRecord } from "@trpc/server";

import { z } from "zod";

import { authenticatedProcedure } from "#/lib/trpc/server/procedures";

import service from "./service";

export const usersRouter = {
  getAll: authenticatedProcedure.query(async () => {
    return await service.getAll();
  }),
  getById: authenticatedProcedure.input(z.string()).query(async ({ input }) => {
    const user = await service.getById(input);
    return user;
  }),
} satisfies TRPCRouterRecord;
