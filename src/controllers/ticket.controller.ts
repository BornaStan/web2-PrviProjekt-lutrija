import { Request, Response } from "express";
import * as ticketService from "../services/ticket.service";
import QRCode from "qrcode";
import { pool } from "../db/config";

export async function create(req: Request, res: Response) {
  const { document_number, numbers } = req.body;
  const auth0_id = req.oidc.user?.sub;

  if (!auth0_id) return res.status(401).json({ message: "Unauthorized" });

  try {
    const ticket = await ticketService.createTicket(auth0_id, document_number, numbers);
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(400).json({ 
      message: error instanceof Error ? error.message : 'Failed to create ticket'
    });
  }
}

interface TicketFormData {
  document_number: string;
  numbers: string;
}
export async function createForView(req: Request) {
  const { document_number, numbers } = req.body as TicketFormData;
  const auth0_id = req.oidc.user?.sub;

  if (!auth0_id) throw new Error("Unauthorized");

  try {
    const numbersArray = numbers
      .split(',')
      .map(num => parseInt(num.trim()));
    
    console.log("Parsed numbers:", numbersArray);
    const ticket = await ticketService.createTicket(auth0_id, document_number, numbersArray);
    
    const ticketUrl = `${req.protocol}://${req.get("host")}/ticket/${ticket.id}`;
    
    const qrCodeDataUrl = await QRCode.toDataURL(ticketUrl);

    await ticketService.saveQrCodeToTicket(ticket.id, qrCodeDataUrl);
    
    return { ...ticket, qrCodeDataUrl, ticketUrl };
    
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create ticket');
  }
}

export async function listUserTickets(req: Request, res: Response) {
  const auth0_id = req.oidc.user?.sub;
  if (!auth0_id) return res.status(401).json({ message: "Unauthorized" });

  const tickets = await ticketService.getUserTickets(auth0_id);
  res.json(tickets);
}

export async function listUserTicketsForView(req: Request) {
  const auth0_id = req.oidc.user?.sub;
  if (!auth0_id) throw new Error("Unauthorized");
  
  return await ticketService.getUserTickets(auth0_id);
}


export async function listUserTicketsForActiveRoundView(req: Request) {
  const auth0_id = req.oidc?.user?.sub;
  if (!auth0_id) throw new Error("Unauthorized");
  return await ticketService.getUserTicketsForActiveRound(auth0_id);
}


export async function getTicketPublic(req: Request) {
  const { id } = req.params;
  return await ticketService.getTicketResult(id);
}


