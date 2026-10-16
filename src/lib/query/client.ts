import { QueryClient } from "@tanstack/react-query";
import superjson from "superjson";

export function getQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
    },
  });
}
