import type { Request, Response } from "express";

import {
  getMakes,
  getEngines,
  getModels,
  getBodies,
  getMileages
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

export async function fetchModels(req: Request, res: Response) {
  try {
    const year = Number(req.params.year);
    const make = String(req.params.make);
    if (isNaN(year)) {
      res.status(400).json({ error: "year must be a number" });
      return;
    }
    const models = await getModels(make, year);
    res.json(models);
  } catch {
    res.status(500).json({ error: "Failed to fetch models" });
  }
}

export async function fetchBodies(req: Request, res: Response) {
  try {
    const bodies = await getBodies();
    res.json(bodies);
  } catch {
    res.status(500).json({ error: "Failed to fetch bodies" });
  }
}
 
export async function fetchMileages(req: Request, res: Response) {
  try {
    const mileages = await getMileages();
    res.json(mileages);
  } catch {
    res.status(500).json({ error: "Failed to fetch mileages" });
  }
}
 