import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { useTRPC } from "#/trpc/client/react";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    return await context.queryClient.query(context.trpc.users.list.queryOptions());
  },
});

function Home() {
  const users = Route.useLoaderData();

  const trpc = useTRPC();
  const { data, isPending, isRefetching, isError, error, refetch } = useQuery(
    trpc.users.list.queryOptions(),
  );

  useEffect(() => {
    setTimeout(() => {
      refetch();
      console.log("refetching");
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(isPending);
  }, [isPending]);

  return (
    <div>
      <div>
        {users.map((u) => (
          <p key={u.id}>{u.username}</p>
        ))}
      </div>
      <div>
        {isPending || isRefetching ? (
          <span>loading...</span>
        ) : isError ? (
          <span>Error: {error.message}</span>
        ) : (
          data.map((u) => <p key={u.id}>{u.username}</p>)
        )}
      </div>
    </div>
  );
}
