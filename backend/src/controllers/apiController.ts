import type { Request, Response } from "express";

import {
  getMakes,
  getEngines,
} from "../services/apiservices.js";

export async function fetchMakes(req: Request, res: Response) {
  try {
    const year = Number(req.params.year);
    if (isNaN(year)) {
      res.status(400).json({ error: "year must be a number" });
      return;
    }
    const makes = await getMakes(year);
    res.json(makes);
  } catch {
    res.status(500).json({ error: "Failed to fetch makes" });
  }
}

export async function fetchEngines(req: Request, res: Response) {
  try {
    const engines = await getEngines();
    res.json(engines);
  } catch {
    res.status(500).json({ error: "Failed to fetch engines" });
  }
}
