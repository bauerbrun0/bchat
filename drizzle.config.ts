import { defineConfig } from "drizzle-kit";

import { serverEnv } from "#/config/server";

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/db/schema/index.ts", "./src/db/schema/auth.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
});
