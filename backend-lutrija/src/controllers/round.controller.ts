import { Request, Response } from "express";
import * as roundService from "../services/round.service";

export async function getCurrentRound(req: Request, res: Response) {
  const round = await roundService.getCurrentRound();
  if (round) res.json(round);
  else res.status(204).send();
}

export async function getLatestResults(req: Request, res: Response) {
  const results = await roundService.getLatestResults();
  if (results) res.json(results);
  else res.status(204).send();
}
