import { TRPCError } from "@trpc/server";

import { middleware } from "#/lib/trpc/server/init";

const authenticatedTrpcMiddleware = middleware(async (opts) => {
  if (!opts.ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return opts.next();
});

export default authenticatedTrpcMiddleware;
