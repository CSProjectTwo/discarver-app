import express from "express";
import type { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();
connectDB();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running with TypeScript!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server active on port ${PORT}`);
});
