import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";

import { clientEnv } from "#/config/client";

import type { TRPCRouter } from "../server/router";

import { getIncomingRequestCookie } from "../server/utils";

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: `${clientEnv.VITE_BASE_URL}/api/trpc`,
      async fetch(input, init) {
        const headers = new Headers(init?.headers);

        if (typeof window === "undefined") {
          // forwarding incoming request cookies to server-side tRPC requests
          const cookie = getIncomingRequestCookie();
          if (cookie) {
            headers.set("Cookie", cookie);
          }
        }

        return fetch(input, { ...init, headers, credentials: "include" });
      },
    }),
  ],
});
