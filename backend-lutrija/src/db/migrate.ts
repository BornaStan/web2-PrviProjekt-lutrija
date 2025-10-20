/* import run from "node-pg-migrate";
import { Pool } from "pg";
import * as path from "path";

async function runMigrations() {
  const pool = new Pool({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432"),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
  });

  const client = await pool.connect();

  try {
    await run({
      dbClient: client, // Use the client, not the pool
      dir: path.join(__dirname, "migrations"),
      direction: "up",
      migrationsTable: "pgmigrations",
    });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    client.release(); // Release the client back to the pool
    await pool.end();
  }
}

runMigrations(); */

// migrate.ts
import run from "node-pg-migrate";
import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

async function runMigrations() {
  const client = new Client({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432"),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
  });

  try {
    await client.connect();
    console.log("✅ Connected to database successfully");
    
    await run({
      dbClient: client,
      dir: "dist/db/migrations", // Use compiled JS files
      direction: "up", 
      migrationsTable: "pgmigrations",
      verbose: true,
    });
    console.log("✅ Migrations completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();