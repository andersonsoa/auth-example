import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/database/schema";

const database = new Database("./src/database/db.db");

export const db = drizzle(database, { schema });
