import { z } from "zod";

export const listUsersOptsSchema = z.object({
  limit: z.number(),
  offset: z.number(),
});

export type ListUsersOpts = z.infer<typeof listUsersOptsSchema>;
