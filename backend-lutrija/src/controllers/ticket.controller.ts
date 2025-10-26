import { Request, Response } from "express";
import * as ticketService from "../services/ticket.service";

export async function create(req: Request, res: Response) {
  const { document_number, numbers } = req.body;
  const auth0_id = req.oidc.user?.sub;

  if (!auth0_id) return res.status(401).json({ message: "Unauthorized" });

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

interface TicketFormData {
  document_number: string;
  numbers: string;
}
// View function (new)
export async function createForView(req: Request) {
  const { document_number, numbers } = req.body as TicketFormData;
  //const auth0_id = req.oidc.user?.sub;

  //if (!auth0_id) throw new Error("Unauthorized");
  //if (!numbers || !Array.isArray(numbers)) throw new Error("Invalid numbers provided");

  try {
    const numbersArray = numbers
      .split(',')
      .map(num => parseInt(num.trim()));
    
    console.log("Parsed numbers:", numbersArray);
    const ticket = await ticketService.createTicket("hdfgfd", document_number, numbersArray);
    return ticket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create ticket');
  }
}

export async function listUserTickets(req: Request, res: Response) {
  //const auth0_id = req.oidc.user?.sub;
  //if (!auth0_id) return res.status(401).json({ message: "Unauthorized" });

  const tickets = await ticketService.getUserTickets("hdfgfd");
  res.json(tickets);
}

export async function listUserTicketsForView() {
  //const auth0_id = req.oidc.user?.sub;
  //if (!auth0_id) return null; // Return null instead of sending response
  
  return await ticketService.getUserTickets("hdfgfd");
}

export async function listUserTicketsForActiveRoundView() {
  //const auth0_id = req.oidc?.user?.sub || "test-user"; // za sada bez auth
  return await ticketService.getUserTicketsForActiveRound("hdfgfd");
}

export async function getTicketPublic(req: Request, res: Response) {
  const { id } = req.params;
  const ticket = await ticketService.getTicketById(id);
  if (!ticket) return res.status(204).send();
  res.json(ticket);
}

