import { Router } from "express";
import * as roundController from "../controllers/round.controller";
import * as ticketController from "../controllers/ticket.controller";
import { requiresAuth } from "express-openid-connect";

const router = Router();

// javni endpointi
router.get("/round/latest-results", roundController.getLatestResults);
router.get("/tickets/:id", ticketController.getTicketPublic);

// korisnički endpointi
router.get("/round/current", requiresAuth(), roundController.getCurrentRound);
router.post("/tickets", requiresAuth(), ticketController.create);
router.get("/tickets", requiresAuth(), ticketController.listUserTickets);


export default router;
