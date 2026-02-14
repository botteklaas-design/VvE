import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { initSchema } from "./schema";
import { seedDatabase } from "./seed";

const DB_PATH = path.join(process.cwd(), "data", "vve.db");

function createDatabase(): Database.Database {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  db.pragma("foreign_keys = ON");
  initSchema(db);
  seedDatabase(db);

  return db;
}

const globalForDb = globalThis as unknown as { __vve_db?: Database.Database };

export const db = globalForDb.__vve_db ?? createDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__vve_db = db;
}
