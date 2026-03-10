import express from "express";
import type { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.ts';


dotenv.config();
connectDB();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());


// Routes
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "API is working" });
});

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Connection to database is successful');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server active on port ${PORT}`);
});
