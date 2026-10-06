import type { ReactNode } from "react";

import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { getContext } from "#/routerContext";
import { trpcClient } from "#/trpc/client";
import { TRPCProvider } from "#/trpc/client/react";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const context = getContext();

  const router = createTanStackRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => {
      return (
        <div>
          <p>Not found!</p>
        </div>
      );
    },
    Wrap: (props: { children: ReactNode }) => {
      return (
        <TRPCProvider trpcClient={trpcClient} queryClient={context.queryClient}>
          {props.children}
        </TRPCProvider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: context.queryClient,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
