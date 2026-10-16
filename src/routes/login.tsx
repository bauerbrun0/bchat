import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import CenteredFormLayout from "#/components/layouts/CenteredFormLayout";
import LoginForm from "#/features/login/components/LoginForm";
import { getSession } from "#/lib/auth/functions";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    const isServerInitialized = await context.queryClient.query(
      context.trpc.serverSetup.getIsInitialized.queryOptions(),
    );
    if (!isServerInitialized) {
      throw redirect({
        to: "/setup",
      });
    }

    const session = await getSession();
    if (session) {
      throw redirect({
        to: "/app",
      });
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CenteredFormLayout>
      <LoginForm />
    </CenteredFormLayout>
  );
}
