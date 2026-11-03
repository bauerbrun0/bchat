import type { BetterAuthPlugin } from "better-auth";

import { APIError, createAuthMiddleware } from "better-auth/api";
import { z } from "zod";

import { createUserSchema } from "#/features/settings/admin/user-management/create-user/userSchema";

export const customValidations = () => {
  return {
    id: "validation-plugin",
    hooks: {
      before: [
        {
          matcher: (context) => {
            return context.path === "/admin/create-user";
          },
          handler: createAuthMiddleware(async (ctx) => {
            const { error } = createUserSchema.safeParse(ctx.body);
            if (error) {
              throw new APIError("BAD_REQUEST", {
                code: "VALIDATION_ERROR",
                cause: z.treeifyError(error),
              });
            }
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin;
};
