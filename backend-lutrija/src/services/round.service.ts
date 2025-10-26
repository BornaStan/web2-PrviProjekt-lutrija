import { pool } from "../db/config";

export async function getCurrentRound() {
  const result = await pool.query("SELECT * FROM rounds WHERE is_active = TRUE");
  return result.rows[0] || null;
}

/* export async function getLatestResults() {
  const result = await pool.query(
    "SELECT * FROM rounds WHERE results_numbers IS NOT NULL ORDER BY results_recorded_at ASC LIMIT 1"
  );
  return result.rows[0] || null;
} */

export async function getLatestResults() {
  // Provjeri postoji li aktivno kolo
  const activeRound = await pool.query(`
    SELECT id FROM rounds WHERE is_active = true LIMIT 1
  `);

  // Ako postoji aktivno kolo → ne prikazuj rezultate
  if (activeRound.rows.length > 0) {
    return null;
  }

  // Inače, dohvatimo zadnje zatvoreno kolo s rezultatima
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