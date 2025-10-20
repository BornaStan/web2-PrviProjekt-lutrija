import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import { authM2M, requireM2MClient } from "./middleware/authM2M";
//import { authUser } from "./middleware/authUser";
import adminRoutes from "./routes/admin";
import apiRoutes from "./routes/api";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.send("OK"));

// admin endpointi (M2M)
//app.use("/admin", authM2M, requireM2MClient, adminRoutes);
app.use("/admin", adminRoutes)

// korisnički endpointi (user login)
app.use("/api", apiRoutes);

export default app;
