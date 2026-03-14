import type { Request, Response } from "express";
import { getEngines } from "../services/apiservices.ts";

export async function fetchEngines(req: Request, res: Response) {
  try {
    const engines = await getEngines();
    res.json(engines);
  } catch {
    res.status(500).json({ error: "Failed to fetch engines" });
  }
}