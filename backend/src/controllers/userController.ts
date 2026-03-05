import { Request, Response } from "express";
import { createAccount } from "../services/userService.ts";

export async function register(req: Request, res: Response) {
  try {
    const user = await createAccount(req.body);
    
    // Don't send back the password!
    res.status(201).json({
      message: "Account created!",
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
