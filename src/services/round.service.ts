import { pool } from "../db/config";

export async function getCurrentRound() {
  const result = await pool.query("SELECT * FROM rounds WHERE is_active = TRUE");
  return result.rows[0] || null;
}

export async function getLatestResults() {
  const activeRound = await pool.query(`
    SELECT id FROM rounds WHERE is_active = true OR results_numbers IS NULL LIMIT 1
  `);
  if (activeRound.rows.length > 0) {
    return null;
  }

  const result = await pool.query(`
    SELECT *
    FROM rounds
    WHERE is_active = false
      AND results_numbers IS NOT NULL
    ORDER BY results_recorded_at DESC
    LIMIT 1
  `);

  return result.rows[0] || null;
}