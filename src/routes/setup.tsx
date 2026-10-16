import { createFileRoute, redirect } from "@tanstack/react-router";

import CenteredFormLayout from "#/components/layouts/CenteredFormLayout";
import SetupForm from "#/features/setup/components/SetupForm";

export const Route = createFileRoute("/setup")({
  beforeLoad: async ({ context }) => {
    const isServerInitialized = await context.queryClient.query(
      context.trpc.serverSetup.getIsInitialized.queryOptions(),
    );
    if (isServerInitialized) {
      throw redirect({
        to: "/app",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CenteredFormLayout>
      <SetupForm />
    </CenteredFormLayout>
  );
}
