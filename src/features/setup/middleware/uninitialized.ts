import { TRPCError } from "@trpc/server";

import logger from "#/lib/logger";
import { middleware } from "#/lib/trpc/server/init";

import service from "../service";

const log = logger.child({ module: "serverUninitializedTrpcMiddleware" });

const serverUninitializedTrpcMiddleware = middleware(async (opts) => {
  const isServerInitialized = await service.getIsInitialized();

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
