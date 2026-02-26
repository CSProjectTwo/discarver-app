import type { Request, Response } from 'express';

// Request: what comes in | Response: what goes out
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Register logic will go here" });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Login logic will go here" });
};
