import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { username } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { z } from "zod";

import { db } from "#/db";
import * as schema from "#/db/schema/auth";
import { createUserSchema } from "#/features/settings/admin/user-management/create-user/userSchema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  user: {
    additionalFields: {
      role: {
        fieldName: "role",
        type: "string",
        defaultValue: "user",
        required: true,
      },
      username: {
        fieldName: "username",
        type: "string",
        required: true,
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/admin/create-user") {
        try {
          createUserSchema.parse(ctx.body);
        } catch (error: unknown) {
          if (error instanceof z.ZodError) {
            throw new APIError("BAD_REQUEST", {
              code: "VALIDATION_ERROR",
              cause: z.treeifyError(error),
            });
          }
        }
        return;
      }
    }),
  },
  disabledPaths: ["/is-username-available"],
  plugins: [username(), admin(), tanstackStartCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
