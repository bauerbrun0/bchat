import { createMiddleware } from "@tanstack/react-start";

import logger from "#/lib/logger";

import { isTrpcRequest } from "./helpers";

const log = logger.child({ module: "loggingMiddleware" });

const loggingMiddleware = createMiddleware().server(({ next, request, pathname }) => {
  if (isTrpcRequest(pathname)) {
    return next();
  }
  log.info("request", {
    method: request.method,
    pathname,
  });
  return next();
});

export default loggingMiddleware;
