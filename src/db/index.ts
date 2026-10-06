import { drizzle } from "drizzle-orm/node-postgres";

import { serverEnv } from "#/config/server";

export const db = drizzle(serverEnv.DATABASE_URL);

export type DB = typeof db;

export type Transaction = Parameters<Parameters<(typeof db)["transaction"]>[0]>[0];
