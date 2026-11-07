import type { TRPCRouterRecord } from "@trpc/server";

import { baseProcedure } from "#/lib/trpc/server/procedures";

import { listUsersOptsSchema } from "./schema";
import service from "./service";

export const userManagementRouter = {
  listUsers: baseProcedure.input(listUsersOptsSchema).query(async (opts) => {
    return await service.listUsers(opts.input);
  }),
} satisfies TRPCRouterRecord;
