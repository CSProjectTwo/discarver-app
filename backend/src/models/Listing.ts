import mongoose, { Schema } from "mongoose";

const MakeSchema = new Schema ();
const ModelSchema = new Schema ();
const TrimSchema = new Schema ();
const EngineSchema = new Schema ();
const BodySchema = new Schema ();

const ListingSchema = new Schema();

export const Listing = mongoose.model("Listing", ListingSchema);