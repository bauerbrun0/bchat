import { z } from "zod";

export const username = z
  .string()
  .min(3, "Username must be at least 3 characters.")
  .max(32, "Username must be at most 32 characters.")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores.");

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password must be at most 128 characters.")
  .refine((password) => !/\s/.test(password), {
    message: "Password cannot contain whitespace.",
  });

export const displayUsername = z
  .string()
  .trim()
  .min(3, "Display username must be at least 3 characters.")
  .max(50, "Display username must be at most 50 characters.")
  .regex(
    /^[\p{L}\p{M}\p{N}_. -]+$/u,
    "Display username can only contain letters, numbers, spaces, underscores, hyphens, and periods.",
  )
  .refine((value) => /[\p{L}\p{N}]/u.test(value), {
    message: "Display username must contain at least one letter or number.",
  });

export const role = z.enum(["user", "admin"]);
