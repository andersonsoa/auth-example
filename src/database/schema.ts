import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { randomUUID } from "node:crypto";

export const users = sqliteTable("user", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export type TUser = typeof users.$inferInsert;
export type TAccounts = typeof accounts.$inferInsert;