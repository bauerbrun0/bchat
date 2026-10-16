import { z } from "zod";

const username = z
  .string()
  .min(3, "Username must be at least 3 characters.")
  .max(32, "Username must be at most 32 characters.")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores.");

const password = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password must be at most 128 characters.")
  .refine((password) => !/\s/.test(password), {
    message: "Password cannot contain whitespace.",
  });

export const newUserSchema = z
  .object({
    username,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type NewUser = z.infer<typeof newUserSchema>;

export const loginSchema = z.object({
  username: z.string().nonempty("Username is required."),
  password: z.string().nonempty("Password is required."),
});
