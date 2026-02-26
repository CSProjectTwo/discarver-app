import express from "express";
import type { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;


// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server active on port ${PORT}`);
});
