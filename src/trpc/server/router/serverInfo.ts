import type { TRPCRouterRecord } from "@trpc/server";

import serverInfoService from "#/services/serverInfoService";

import { baseProcedure } from "../procedures";

const serverInfoRouter = {
  getIsInitialized: baseProcedure.query(async () => {
    return await serverInfoService.getIsInitialized();
  }),
  refreshIsInitialized: baseProcedure.mutation(async () => {
    await serverInfoService.refreshIsInitialized();
  }),
} satisfies TRPCRouterRecord;

export default serverInfoRouter;
