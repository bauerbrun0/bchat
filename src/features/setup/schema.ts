import { z } from "zod";

import { username, password } from "#/lib/schemas/user";

export const initialAdminSchema = z
  .object({
    username,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type InitialAdmin = z.infer<typeof initialAdminSchema>;
