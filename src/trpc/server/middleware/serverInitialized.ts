import { TRPCError } from "@trpc/server";

import logger from "#/lib/logger";
import serverInfoService from "#/services/serverInfoService";

import { middleware } from "../init";

const log = logger.child({ module: "serverInitializedTrpcMiddleware" });

const serverInitializedTrpcMiddleware = middleware(async (opts) => {
  const isServerInitialized = await serverInfoService.getIsInitialized();

  if (!isServerInitialized) {
    log.error("server_uninitialized", {
      type: opts.type,
      path: opts.path,
    });
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Server not initialized, visit /setup",
    });
  }

  return opts.next();
});

export default serverInitializedTrpcMiddleware;
