import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./src/database/db.db",
  },
  verbose: true,
  strict: true,
});
