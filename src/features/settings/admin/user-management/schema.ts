import { z } from "zod";

import { role } from "#/lib/schemas/user";
import { dateRange } from "#/lib/schemas/utils";

const fieldSchema = z.enum(["username", "displayUsername", "role", "createdAt", "updatedAt"]);

const orderSchema = z.enum(["asc", "desc"]);

const sortSchema = z.object({
  by: fieldSchema,
  order: orderSchema,
});

export const listUsersOptsSchema = z.object({
  limit: z.number().int().min(1).max(100),
  offset: z.number().int().nonnegative(),
  usernameFilter: z.string().optional(),
  displayUsernameFilter: z.string().optional(),
  roleFilter: z.array(role).optional(),
  createdAtFilter: dateRange.optional(),
  updatedAtFilter: dateRange.optional(),
  sort: sortSchema.optional(),
});

export type Field = z.infer<typeof fieldSchema>;

export type Order = z.infer<typeof orderSchema>;

export type Sort = z.infer<typeof sortSchema>;

export type ListUsersOpts = z.infer<typeof listUsersOptsSchema>;
