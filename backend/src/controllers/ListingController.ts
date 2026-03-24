import type { Request, Response } from "express";
import { getAllListings, getListingById } from "../services/ListingServices.ts";

export async function getListings(req: Request, res: Response) {
  try {
    const { make, model, year, min_price, max_price, condition } = req.query;
    const listings = await getAllListings({
      make:      make as string,
      model:     model as string,
      year:      year      ? Number(year)      : undefined,
      min_price: min_price ? Number(min_price) : undefined,
      max_price: max_price ? Number(max_price) : undefined,
      condition: condition as string,
    });
    res.json(listings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getListing(req: Request, res: Response) {
  try {
    const listing = await getListingById(req.params.id as string);
    if (!listing) {
      res.status(404).json({ error: "Listing not found" });
      return;
    }
    res.json(listing);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}