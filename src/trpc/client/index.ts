import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";

import { clientEnv } from "#/config/client";

import type { TRPCRouter } from "../server/router";

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: `${clientEnv.VITE_BASE_URL}/api/trpc`,
    }),
  ],
});
