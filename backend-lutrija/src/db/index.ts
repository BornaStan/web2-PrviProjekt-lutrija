import { Pool } from "pg";
import { run as runMigrations } from "node-pg-migrate";
import path from "path";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function initDb() {
  console.log("🏗️  Pokrećem migracije baze podataka...");
  await runMigrations({
    databaseUrl: process.env.DATABASE_URL!,
    dir: path.join(__dirname, "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
    count: Infinity,
    log: () => {},
  });
  console.log("✅ Migracije dovršene!");
}
