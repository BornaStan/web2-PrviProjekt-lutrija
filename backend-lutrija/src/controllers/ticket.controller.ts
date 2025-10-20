import { Request, Response } from "express";
import * as ticketService from "../services/ticket.service";

export async function create(req: Request, res: Response) {
  const { document_number, numbers } = req.body;
//  const auth0_id = req.auth?.payload.sub;

//  if (!auth0_id) return res.status(401).json({ message: "Unauthorized" });

  try {
    const ticket = await ticketService.createTicket("hdfgfd", document_number, numbers);
    res.status(201).json(ticket);
  } catch (error) {
    // Log the error for server-side debugging
    console.error('Error creating ticket:', error);
    
    // Return 400 Bad Request to the client
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Failed to create ticket'
    });
  }
}

export async function listUserTickets(req: Request, res: Response) {
  //const auth0_id = req.auth?.payload.sub;
  //if (!auth0_id) return res.status(401).json({ message: "Unauthorized" });

  const tickets = await ticketService.getUserTickets("hdfgfd");
  res.json(tickets);
}

export async function getTicketPublic(req: Request, res: Response) {
  const { id } = req.params;
  const ticket = await ticketService.getTicketById(id);
  if (!ticket) return res.status(204).send();
  res.json(ticket);
}
