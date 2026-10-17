import { createFileRoute } from "@tanstack/react-router";

import AppLayout from "#/components/layouts/AppLayout";

export const Route = createFileRoute("/_authed/app")({
  loader: async ({ context }) => {
    return await context.queryClient.query(context.trpc.users.getAll.queryOptions());
  },
  component: App,
});

function App() {
  return (
    <AppLayout>
      <p>Content</p>
    </AppLayout>
  );
}
