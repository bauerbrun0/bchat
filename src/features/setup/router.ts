import type { TRPCRouterRecord } from "@trpc/server";

import { baseProcedure, uninitializedServerProcedure } from "#/lib/trpc/server/procedures";

import { initialAdminSchema } from "./schema";
import service from "./service";

export const serverSetupRouter = {
  getIsInitialized: baseProcedure.query(async () => {
    return await service.getIsInitialized();
  }),
  createInitialAdminUser: uninitializedServerProcedure
    .input(initialAdminSchema)
    .mutation(async ({ input }) => {
      const user = await service.createInitialAdmin(input);
      return user;
    }),
} satisfies TRPCRouterRecord;
