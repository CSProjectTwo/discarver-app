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

const MileageSchema = new Schema(
  {
    api_id: { type: Number },
    combined_mpg: { type: Number },
    epa_city_mpg: { type: Number },
    epa_highway_mpg: { type: Number },
    fuel_tank_capacity: { type: String },
    battery_capacity_electric: { type: String, default: null },
  },
  { _id: false }
);

const ListingSchema = new Schema(
{
    vehicle: {
        make:    { type: MakeSchema,    required: true },
        model:   { type: ModelSchema,   required: true },
        trim:    { type: TrimSchema,    required: true },
        engine:  { type: EngineSchema },
        body:    { type: BodySchema },
        mileage: { type: MileageSchema },
    },
 
    // manually entered fields
    title: { type: String,  required: true },
    name: { type: String, required: true },
    description: { type: String,  required: true },
    price: { type: Number,  required: true },
    odometer_miles: { type: Number,  required: true }, 
    previous_owners: { type: Number,  default: 1 }, 
    condition: { type: String,  enum: ["excellent", "good", "fair", "poor"], required: true }, 
    colour: { type: String },
    seller_details: {
        name: { type: String },
        location: { type: String },
        seller_type: { type: String, enum: ["private","dealer"]},
    },
    MOT_expiry: {type: String },
    road_tax: {type: String },
    emissions_class: {type: String },
    images: [{ type: String }],
 
    status: { type: String, enum: ["active", "sold"], default: "active" },
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", ListingSchema);