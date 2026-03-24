import mongoose, { Schema } from "mongoose";


const ListingSchema = new Schema();

export const Listing = mongoose.model("Listing", ListingSchema);