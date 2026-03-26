import express from "express";
import type { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.ts";
import carRoutes from "./routes/carRoutes.ts";
import listingRoutes from "./routes/ListingRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";


dotenv.config();
connectDB();

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", carRoutes);
app.use("/api/listings", listingRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Discarver API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server active on port ${PORT}`);

app.use(express.json());
app.use(cors());

app.use("/api", carRoutes);
app.use("/api/users", userRoutes);
});