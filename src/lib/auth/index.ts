import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { admin } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { db } from "#/db";
import * as schema from "#/db/schema/auth";

import logger from "../logger";
import { customValidations } from "./plugins/customValidations";

const log = logger.child({ module: "betterAuth" });

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
  disabledPaths: ["/is-username-available"],
  plugins: [username(), admin(), customValidations(), tanstackStartCookies()],
  logger: {
    log: (level, message, ...args) => {
      log.log(level, message, args);
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
