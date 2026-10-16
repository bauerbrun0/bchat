import { TRPCError } from "@trpc/server";

import logger from "#/lib/logger";
import serverInfoService from "#/services/serverInfoService";

import { middleware } from "../init";

const log = logger.child({ module: "serverUninitializedTrpcMiddleware" });

const serverUninitializedTrpcMiddleware = middleware(async (opts) => {
  const isServerInitialized = await serverInfoService.getIsInitialized();

  if (isServerInitialized) {
    log.error("server_initialized", {
      type: opts.type,
      path: opts.path,
    });
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Server already initialized",
    });
  }

  return opts.next();
});

export default serverUninitializedTrpcMiddleware;
