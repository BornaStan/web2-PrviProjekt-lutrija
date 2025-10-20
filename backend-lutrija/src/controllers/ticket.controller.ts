import { Request, Response } from "express";
import * as ticketService from "../services/ticket.service";

export async function create(req: Request, res: Response) {
  const { document_number, numbers } = req.body;
  const auth0_id = req.auth?.payload.sub;

  if (!auth0_id) return res.status(401).json({ message: "Unauthorized" });

  const ticket = await ticketService.createTicket(auth0_id, document_number, numbers);
  res.status(201).json(ticket);
}

export async function listUserTickets(req: Request, res: Response) {
  const auth0_id = req.auth?.payload.sub;
  if (!auth0_id) return res.status(401).json({ message: "Unauthorized" });

  const tickets = await ticketService.getUserTickets(auth0_id);
  res.json(tickets);
}

export async function getTicketPublic(req: Request, res: Response) {
  const { id } = req.params;
  const ticket = await ticketService.getTicketById(id);
  if (!ticket) return res.status(404).send();
  res.json(ticket);
}
