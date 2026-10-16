import logger from "#/lib/logger";

import { middleware } from "../init";

const log = logger.child({ module: "loggingTrpcMiddleware" });

const loggingTrpcMiddleware = middleware(async (opts) => {
  log.info("trpc_request", {
    type: opts.type,
    path: opts.path,
  });
  return opts.next();
});

export default loggingTrpcMiddleware;
