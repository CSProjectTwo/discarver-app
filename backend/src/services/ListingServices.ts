import { Listing } from "../models/Listing.js";

export async function getAllListings(filters: {
  make?:      string;
  model?:     string;
  year?:      number;
  min_price?: number;
  max_price?: number;
  condition?: string;
}) {
  const query: Record<string, unknown> = { status: "active" };

  if (filters.make)      query["vehicle.make.name"]  = new RegExp(filters.make,  "i");
  if (filters.model)     query["vehicle.model.name"] = new RegExp(filters.model, "i");
  if (filters.year)      query["vehicle.trim.year"]  = filters.year;
  if (filters.condition) query["condition"]           = filters.condition;

  if (filters.min_price || filters.max_price) {
    const priceQuery: Record<string, number> = {};
    if (filters.min_price) priceQuery.$gte = filters.min_price;
    if (filters.max_price) priceQuery.$lte = filters.max_price;
    query.price = priceQuery;
  }

  return await Listing.find(query).sort({ createdAt: -1 });
}

export async function getListingById(id: string) {
  return await Listing.findById(id);
}