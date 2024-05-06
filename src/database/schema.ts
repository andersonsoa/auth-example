import {
  integer,
  sqliteTable,
  text,
  primaryKey,
  unique,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";

export const users = sqliteTable("user", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  roles: text("roles", { enum: ["USER", "ADMIN"] }).$defaultFn(() => "USER"),
  image: text("image"),
  isTwoFactorEnable: integer("is_two_factor_enable", {
    mode: "boolean",
  }).$default(() => false),
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

export const verificationToken = sqliteTable(
  "verification_token",
  {
    id: text("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    email: text("email").notNull(),
    token: text("token").unique().notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.email, t.token),
  }),
);

export const passwordResetToken = sqliteTable(
  "password_reset_token",
  {
    id: text("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    email: text("email").notNull(),
    token: text("token").unique().notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.email, t.token),
  }),
);

export const twoFactorToken = sqliteTable(
  "two_factor_token",
  {
    id: text("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    email: text("email").notNull(),
    token: text("token").unique().notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (t) => ({
    unq: unique().on(t.email, t.token),
  }),
);

export const twoFactorConfirmation = sqliteTable(
  "two_factor_confirmation",
  {
    id: text("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({
    unq: unique().on(t.userId),
  }),
);

export const usersRelations = relations(users, ({ one }) => ({
  twoFactorConfimation: one(twoFactorConfirmation, {
    fields: [users.id],
    references: [twoFactorConfirmation.userId],
  }),
}));

export const twoFactorConfirmationRelations = relations(
  twoFactorConfirmation,
  ({ one }) => ({
    user: one(users, {
      fields: [twoFactorConfirmation.userId],
      references: [users.id],
    }),
  }),
);

export type TUser = typeof users.$inferInsert;
export type TAccounts = typeof accounts.$inferInsert;
export type TVerificationToken = typeof verificationToken.$inferInsert;
export type TPasswordResetToken = typeof passwordResetToken.$inferInsert;
export type TTwoFactorToken = typeof twoFactorToken.$inferInsert;
export type TTwoFactorConfirmation = typeof twoFactorConfirmation.$inferInsert;
