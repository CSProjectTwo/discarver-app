import type { Request, Response } from "express";
import { createAccount, loginAccount } from "../services/userServices.js";

export async function register(req: Request, res: Response) {
  try {
    const user = await createAccount(req.body);
    res.status(201).json({
      message: "Account created!",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const result = await loginAccount(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}