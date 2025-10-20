import { Router } from "express";
import * as roundController from "../controllers/round.controller";
import * as ticketController from "../controllers/ticket.controller";
//import { authUser } from "../middleware/authUser";

const router = Router();

// javni endpointi
router.get("/round/latest-results", roundController.getLatestResults);
router.get("/tickets/:id", ticketController.getTicketPublic);

// korisnički endpointi
//router.use(authUser);
router.get("/round/current", roundController.getCurrentRound);
router.post("/tickets", ticketController.create);
router.get("/tickets", ticketController.listUserTickets);

export default router;
