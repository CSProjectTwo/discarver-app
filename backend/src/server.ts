import express from "express";
import type { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import carRoutes from "./routes/carRoutes.js";
import listingRoutes from "./routes/ListingRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/users",    userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api",          carRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Discarver API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server active on port ${PORT}`);
});