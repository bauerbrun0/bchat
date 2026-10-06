import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

import logger from "#/lib/logger";
import serverInfoService from "#/services/serverInfoService";

import { isTrpcRequest } from "./helpers";

const log = logger.child({ module: "isServerInitializedMiddleware" });

const isServerInitializedMiddleware = createMiddleware().server(
  async ({ next, pathname, request }) => {
    if (isTrpcRequest(pathname)) {
      return next();
    }

    const isServerInitialized = await serverInfoService.getIsInitialized();

    if (!isServerInitialized && pathname !== "/setup") {
      log.error("server_uninitialized", {
        method: request.method,
        pathname,
      });
      throw redirect({
        to: "/setup",
      });
    }

    if (isServerInitialized && pathname === "/setup") {
      log.error("server_already_initialized", {
        method: request.method,
        pathname,
      });
      throw redirect({
        to: "/",
      });
    }

    return next();
  },
);

export default isServerInitializedMiddleware;
