import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin";
import apiRoutes from "./routes/api";
import { auth, requiresAuth } from "express-openid-connect";

dotenv.config();

const app = express();

const config = {
    authRequired: false,
    idpLogout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    clientSecret: process.env.CLIENT_SECRET,
    authorizationParams: {
        response_type: 'code'
    },
};

app.use(auth(config));
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.send("OK"));

// admin endpointi (M2M)
function requiresRole(role: string) {
    return (req, res, next) => {
        const user = req.oidc.user;
        const roles = user['https://example.com/roles'] || [];
        if (!roles.includes(role)) {
            return res.status(403).send();
        }
        next();
    };
}

app.use("/admin", requiresAuth, requiresRole, adminRoutes);

// korisnički endpointi (user login)
app.use("/api", apiRoutes);

export default app;
