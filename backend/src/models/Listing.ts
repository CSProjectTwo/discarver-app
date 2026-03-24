import mongoose, { Schema } from "mongoose";

const MakeSchema = new Schema (
    { 
    api_id: { type: Number, required: true }, 
    name: { type: String, required: true } 
    },
  { _id: false }
);

const ModelSchema = new Schema (
    { 
    api_id: { type: Number, required: true }, 
    name: { type: String, required: true }, 
    make_id: { type: Number, required: true } 
    },
  { _id: false }
);

const TrimSchema = new Schema (
    { 
    api_id: { type: Number, required: true },
    name: { type: String },
    year: { type: Number, required: true },
    description: { type: String } 
    },
  { _id: false }
);

const EngineSchema = new Schema (
    {
    api_id:        { type: Number },
    engine_type:   { type: String },
    fuel_type:     { type: String },
    cylinders:     { type: String },
    size:          { type: String },
    horsepower_hp: { type: Number },
    torque_ft_lbs: { type: Number },
    drive_type:    { type: String },
    transmission:  { type: String },
    },
    { _id: false }
);
const BodySchema = new Schema (
    {
    api_id: { type: Number }, 
    type: { type: String },
    doors: { type: Number },
    seats: { type: Number }
    },
    { _id: false }
);

const ListingSchema = new Schema();

export const Listing = mongoose.model("Listing", ListingSchema);