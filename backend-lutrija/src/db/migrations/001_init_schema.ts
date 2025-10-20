import { MigrationBuilder } from "node-pg-migrate";

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("rounds", {
    id: "id",
    is_active: { type: "boolean", notNull: true, default: true },
    created_at: { type: "timestamp with time zone", default: pgm.func("now()") },
    closed_at: { type: "timestamp with time zone" },
    results_numbers: { type: "integer[]" },
    results_recorded_at: { type: "timestamp with time zone" },
  });

  pgm.createIndex("rounds", ["is_active"], {
    name: "one_active_round",
    unique: true,
    where: "is_active = TRUE",
  });

  pgm.createTable("tickets", {
    id: { type: "uuid", primaryKey: true, default: pgm.func("gen_random_uuid()") },
    auth0_id: { type: "text", notNull: true },
    document_number: { type: "varchar(20)", notNull: true },
    round_id: { type: "integer", notNull: true, references: "rounds" },
    numbers: { type: "integer[]", notNull: true },
    created_at: { type: "timestamp with time zone", default: pgm.func("now()") },
    qr_code_url: { type: "text" },
  });

  pgm.createIndex("tickets", ["round_id"]);
  pgm.createIndex("tickets", ["auth0_id"]);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("tickets");
  pgm.dropTable("rounds");
}
