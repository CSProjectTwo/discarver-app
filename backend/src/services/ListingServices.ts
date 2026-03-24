import { Listing } from "../models/Listing.js";

export async function getAllListings(filters: {
  make?:      string;
  model?:     string;
  year?:      number;
  min_price?: number;
  max_price?: number;
  condition?: string;
}) {
  const query: any = { status: "active" };

  if (filters.make)      query["vehicle.make.name"]  = new RegExp(filters.make, "i");
  if (filters.model)     query["vehicle.model.name"] = new RegExp(filters.model, "i");
  if (filters.year)      query["vehicle.trim.year"]  = filters.year;
  if (filters.condition) query["condition"]           = filters.condition;

  if (filters.min_price || filters.max_price) {
    query.price = {};
    if (filters.min_price) query.price.$gte = filters.min_price;
    if (filters.max_price) query.price.$lte = filters.max_price;
  }

  return await Listing.find(query).sort({ createdAt: -1 });
}

export async function getListingById(id: string) {
  return await Listing.findById(id);
}