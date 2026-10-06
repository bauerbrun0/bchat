import type { QueryClient } from "@tanstack/react-query";

import { createTRPCOptionsProxy, type TRPCOptionsProxy } from "@trpc/tanstack-react-query";

import type { TRPCRouter } from "#/trpc/server/router";

import { getQueryClient } from "#/tanstack-query/queryClient";
import { trpcClient } from "#/trpc/client";

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
