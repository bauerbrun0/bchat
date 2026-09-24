import { QueryClient } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import superjson from "superjson";

import { trpcClient } from "#/trpc/client";

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
    },
  });

  return {
    queryClient,
    trpc: createTRPCOptionsProxy({
      client: trpcClient,
      queryClient,
    }),
  };
}
