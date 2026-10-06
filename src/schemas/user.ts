import { z } from "zod";

import { timestamps } from "./helpers";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  passwordHash: z.string(),
  isAdmin: z.boolean(),
  ...timestamps,
});

export const newUserSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(32, "Username must be at most 32 characters.")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be at most 128 characters.")
      .refine((password) => !/\s/.test(password), {
        message: "Password cannot contain whitespace.",
      }),
    confirmPassword: z.string(),
    isAdmin: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });
