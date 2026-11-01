import { z } from "zod";

import { username, password, displayUsername, role } from "#/lib/schemas/user";

export const createUserSchema = z.object({
  name: z.literal("", "Name must be an empty string."),
  email: z
    .email("Invalid e-mail format.")
    .endsWith("@users.invalid", "E-mail must end with '@users.invalid'."),
  password,
  role,
  data: z.object({
    username,
    displayUsername,
  }),
});

export type CreateUserValidationError = NonNullable<
  z.core.$ZodErrorTree<z.infer<typeof createUserSchema>>
>;
