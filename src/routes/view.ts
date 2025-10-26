import { Router } from "express";
import * as roundController from "../controllers/round.controller";
import * as ticketController from "../controllers/ticket.controller";

const router = Router();

// Home page
router.get("/", async (req, res) => {
  try {
    const round = await roundController.getCurrentRoundForView();
    const results = await roundController.getLatestResultsForView();
    const userTickets = res.locals.isAuthenticated ? await ticketController.listUserTicketsForView(req) : [];
    const activeUserTickets = res.locals.isAuthenticated ? await ticketController.listUserTicketsForActiveRoundView(req) : [];
    res.render("index", { round, results, userTickets, ticketsCount: activeUserTickets ? activeUserTickets.length : 0});
  } catch (err) {
    console.error("Error:", err);
    res.status(500).render("error", { message: "Error loading data" });
  }
});


router.get("/ticket", (req, res) => {
  res.render("ticket");
});


router.post("/ticket", async (req, res) => {
  try {
    const ticket = await ticketController.createForView(req);
    res.render("qr2", { ticket });
  } catch (err) {
    console.log(err);
    res.status(400).render("error", { message: err });
  }
});


router.get("/ticket/:id", async (req, res) => {
  try {
    const ticket = await ticketController.getTicketPublic(req);
    res.render("ticket_public", { ticket });
  } catch (err) {
    console.log(err);
    res.status(400).render("error", { message: err });
  }
});



export default router;
