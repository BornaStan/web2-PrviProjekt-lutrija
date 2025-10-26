import express from "express";
import path from "path";
import cors from "cors";
import adminRoutes from "./routes/admin";
import apiRoutes from "./routes/api";
import viewRoutes from "./routes/view";
import { auth } from "express-openid-connect";

const app = express();

app.set("trust proxy", 1);

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "views"));

//app.use(auth(config));
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => res.send("OK"));

/** OIDC config (Auth0) ← ADD */
const oidcConfig = {
  authRequired: false,              // javne stranice dopuštene
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
app.use(auth(oidcConfig));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.oidc?.isAuthenticated?.() || false;
  res.locals.user = req.oidc?.user || null;
  next();
});

// korisnički endpointi (user login)
app.use("/", viewRoutes);
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);


export default app;
