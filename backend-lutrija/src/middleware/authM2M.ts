/* import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";

export const authM2M = auth({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE,
  tokenSigningAlg: "RS256",
});

export function requireM2MClient(req: Request, res: Response, next: NextFunction) {
  const clientId = req.auth?.payload?.azp;
  if (clientId !== process.env.ADMIN_CLIENT_ID) {
    return res.status(403).json({ message: "Unauthorized M2M client" });
  }
  next();
}
 */