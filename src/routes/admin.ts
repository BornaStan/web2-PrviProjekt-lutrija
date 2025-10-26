console.log("AUTH0_AUDIENCE =", process.env.AUTH0_AUDIENCE);
console.log("AUTH0_ISSUER_BASE_URL =", process.env.AUTH0_ISSUER_BASE_URL);

import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import { auth as jwtCheck, requiredScopes } from "express-oauth2-jwt-bearer";

const router = Router();



const checkJwt = jwtCheck({
  audience: process.env.AUTH0_AUDIENCE,                // npr. https://lutrija-api
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,    // https://YOUR_TENANT.auth0.com
});

const needWriteRounds = requiredScopes("write:rounds");

router.post("/new-round", checkJwt, needWriteRounds, adminController.newRound);
router.post("/close", checkJwt, needWriteRounds, adminController.closeRound);
router.post("/store-results", checkJwt, needWriteRounds, adminController.storeResults);

export default router;
