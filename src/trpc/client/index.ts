import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";

import type { TRPCRouter } from "../server/router";

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: "http://localhost:3000/api/trpc",
    }),
  ],
});
