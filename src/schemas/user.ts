import { z } from "zod";

import { timestamps } from "./helpers";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  passwordHash: z.string(),
  isAdmin: z.boolean(),
  ...timestamps,
});

export const newUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  isAdmin: z.boolean().optional(),
});
