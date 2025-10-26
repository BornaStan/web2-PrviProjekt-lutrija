import { pool } from "../db/config";
import { getCurrentRound } from "./round.service"

export async function createTicket(auth0_id: string, document_number: string, numbers: number[]) {
  if (!isValidDocumentNumber) throw new Error("Invalid document number");
  if (!isValidTicketNumbers) throw new Error("Invalid ticket numbers");
  
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

export async function getUserTicketsForActiveRound(auth0_id: string) {
  // koristimo funkciju iz round.service.ts
  const activeRound = await getCurrentRound();

  if (!activeRound) {
    // ako nema aktivnog kola, nema ni uplata
    return [];
  }

  const result = await pool.query(
    "SELECT * FROM tickets WHERE auth0_id = $1 AND round_id = $2 ORDER BY created_at DESC",
    [auth0_id, activeRound.id]
  );

  return result.rows;
}

export async function getTicketById(id: string) {
  const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [id]);
  return result.rows[0] || null;
}

function isValidDocumentNumber(document_number: string): boolean {
  const trimmed = document_number?.trim();
  return trimmed?.length > 0 && trimmed?.length <= 20;
}

function isValidTicketNumbers(numbers: number[]): boolean {
  if (numbers?.length < 6 || numbers?.length > 10) return false;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < 1 || numbers[i] > 45) return false;
    if (numbers.slice(0, i).includes(numbers[i]) || numbers.includes(numbers[i], i + 1)) return false;
  }
  return true;
}
