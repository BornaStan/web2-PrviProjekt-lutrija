import { Router } from "express";
import * as adminController from "../controllers/admin.controller";

const router = Router();

router.post("/new-round", adminController.newRound);
router.post("/close", adminController.closeRound);
router.post("/store-results", adminController.storeResults);

export default router;
