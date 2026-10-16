import type { QueryClient } from "@tanstack/react-query";

import { createTRPCOptionsProxy, type TRPCOptionsProxy } from "@trpc/tanstack-react-query";

import type { TRPCRouter } from "#/lib/trpc/server/router";

import { getQueryClient } from "#/lib/query/client";
import { trpcClient } from "#/lib/trpc/client";

export interface RouterContext {
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<TRPCRouter>;
}

export function getContext(): RouterContext {
  const queryClient = getQueryClient();

  return {
    queryClient,
    trpc: createTRPCOptionsProxy({
      client: trpcClient,
      queryClient,
    }),
  };
}
