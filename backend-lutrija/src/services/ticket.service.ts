import { pool } from "../db/config";

export async function createTicket(auth0_id: string, document_number: string, numbers: number[]) {
  const active = await pool.query("SELECT id FROM rounds WHERE is_active = TRUE");
  if (active.rowCount === 0) throw new Error("No active round");

  const round_id = active.rows[0].id;
  const result = await pool.query(
    `INSERT INTO tickets (auth0_id, document_number, round_id, numbers)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [auth0_id, document_number, round_id, numbers]
  );

  return result.rows[0];
}

export async function getUserTickets(auth0_id: string) {
  const result = await pool.query(
    "SELECT * FROM tickets WHERE auth0_id = $1 ORDER BY created_at DESC",
    [auth0_id]
  );
  return result.rows;
}

export async function getTicketById(id: string) {
  const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [id]);
  return result.rows[0] || null;
}
