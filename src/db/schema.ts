import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";

import { timestamps } from "./helpers";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar().notNull(),
    passwordHash: varchar("password_hash").notNull(),
    isAdmin: boolean("is_admin").notNull().default(false),
    ...timestamps,
  },
  (table) => [uniqueIndex("username_unique_index").on(sql`lower(${table.username})`)],
);
