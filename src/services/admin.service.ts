import { pool } from "../db/config";

export async function newRound() {
  const active = await pool.query("SELECT * FROM rounds WHERE is_active = TRUE");
  if (active.rowCount > 0) return null;
  const result = await pool.query("INSERT INTO rounds (is_active) VALUES (TRUE) RETURNING *");
  return result.rows[0];
}

export async function closeRound() {
  const result = await pool.query(
    "UPDATE rounds SET is_active = FALSE, closed_at = NOW() WHERE is_active = TRUE RETURNING *"
  );
  return result.rowCount ? result.rows[0] : null;
}

export async function storeResults(numbers: number[]) {
  const result = await pool.query(
    "UPDATE rounds SET results_numbers = $1, results_recorded_at = NOW() WHERE is_active = FALSE AND results_numbers IS NULL RETURNING *",
    [numbers]
  );
  return result.rowCount ? result.rows[0] : null;
}
