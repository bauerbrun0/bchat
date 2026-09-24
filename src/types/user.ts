import { z } from "zod";

export const user = z.object({
  id: z.number(),
  username: z.string(),
});

export type User = z.infer<typeof user>;

export const newUser = z.object({
  username: z.string(),
});

export type NewUser = z.infer<typeof newUser>;
