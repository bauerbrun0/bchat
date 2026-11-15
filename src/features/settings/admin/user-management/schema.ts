import { z } from "zod";

import { role } from "#/lib/schemas/user";
import { dateRange } from "#/lib/schemas/utils";

export const listUsersOptsSchema = z.object({
  limit: z.number().int().min(1).max(100),
  offset: z.number().int().nonnegative(),
  usernameFilter: z.string().optional(),
  displayUsernameFilter: z.string().optional(),
  roleFilter: z.array(role).optional(),
  createdFilter: dateRange.optional(),
  updatedFilter: dateRange.optional(),
});

export type ListUsersOpts = z.infer<typeof listUsersOptsSchema>;
