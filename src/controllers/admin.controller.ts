import { Request, Response } from "express";
import * as adminService from "../services/admin.service";

export async function newRound(req: Request, res: Response) {
  const result = await adminService.newRound();
  if (result) res.status(201).json(result);
  else res.status(204).send();
}

export async function closeRound(req: Request, res: Response) {
  const result = await adminService.closeRound();
  if (result) res.status(204).send();
  else res.status(204).send();
}

export async function storeResults(req: Request, res: Response) {
  const result = await adminService.storeResults(req.body.results);
  if (result) res.status(201).json(result);
  else res.status(204).send();
}
