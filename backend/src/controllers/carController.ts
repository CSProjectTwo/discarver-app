import type { Request, Response } from "express";
import { getMakes, getModels } from "../services/apiService.ts";

export async function fetchMakes(req: Request, res: Response) {
  try {
    const year = Number(req.params.year);
    const makes = await getMakes(year);
    res.json(makes);
  } catch {
    res.status(500).json({ error: "Failed to fetch makes" });
  }
}

export async function fetchModels(req: Request, res: Response) {
  try {
    const year = Number(req.params.year);
    const make = String(req.params.make);
    const models = await getModels(make, year);
    res.json(models);
  } catch {
    res.status(500).json({ error: "Failed to fetch makes" });
  }
}