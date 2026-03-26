import mongoose   from "mongoose";
import axios      from "axios";
import dotenv     from "dotenv";
import { Listing } from "./models/Listing.js";

dotenv.config();

const API_BASE    = `https://${process.env.API_HOST}/api`;
const API_HEADERS = {
  "x-rapidapi-key":  process.env.API_KEY  as string,
  "x-rapidapi-host": process.env.API_HOST as string,
};

const SEED_YEAR  = 2021;
const SEED_LIMIT = 100;

interface ApiMake   { id: number; name: string }
interface ApiModel  { id: number; name: string; make_id: number }
interface ApiTrim   { id: number; name: string; year: number; make_model_id: number }
interface ApiEngine {
  id: number; make_model_trim_id: number;
  engine_type: string; fuel_type: string; cylinders: string; size: string;
  horsepower_hp: number; torque_ft_lbs: number; drive_type: string; transmission: string;
}
interface ApiBody    { id: number; make_model_trim_id: number; type: string; doors: number; seats: number }
interface ApiMileage {
  id: number; make_model_trim_id: number;
  combined_mpg: number; epa_city_mpg: number; epa_highway_mpg: number;
  fuel_tank_capacity: string; battery_capacity_electric: string | null;
}

// All CarAPI responses are wrapped in { data: [...] }
interface ApiResponse<T> { data: T[] }

const POOL = {
  conditions: ["excellent", "good", "fair", "poor"] as const,
  colours: [
    "Midnight Black", "Pearl White", "Magnetic Grey", "Racing Red",
    "Ocean Blue", "Forest Green", "Burnt Orange", "Champagne Silver",
    "Graphite", "Arctic White", "Cobalt Blue", "Burgundy",
    "Navy Blue", "British Racing Green", "Candy Red", "Titanium Grey",
  ],
  sellerNames: [
    "James Mitchell", "Sarah Thompson", "David Okafor", "Emma Clarke",
    "Liam Patel", "Olivia Bennett", "Noah Williams", "Ava Johnson",
    "Premier Motors", "City Auto Group", "Prestige Cars", "Elite Motors",
    "Drive Direct", "AutoPoint UK", "First Choice Autos", "Star Motors",
  ],
  locations: [
    "London, UK", "Manchester, UK", "Birmingham, UK", "Leeds, UK",
    "Bristol, UK", "Sheffield, UK", "Edinburgh, UK", "Liverpool, UK",
    "Glasgow, UK", "Cardiff, UK", "Nottingham, UK", "Newcastle, UK",
    "Leicester, UK", "Southampton, UK", "Oxford, UK", "Cambridge, UK",
  ],
  sellerTypes: ["private", "dealer"] as const,
  motExpiries: [
    "2025-06-01", "2025-08-14", "2025-10-30", "2025-11-22",
    "2026-01-07", "2026-03-15", "2026-05-20", "2026-07-09",
    "2026-08-01", "2026-09-14", "2026-11-03", "2026-12-18",
    "2027-01-22", "2027-03-11", "2027-05-05", "2027-06-10",
  ],
  roadTax: [
    "£0/year",   "£20/year",  "£30/year",  "£145/year",
    "£155/year", "£165/year", "£180/year", "£195/year",
    "£210/year", "£240/year", "£270/year", "£580/year",
  ],
  emissionsClasses: [
    "Euro 5", "Euro 6", "Euro 6d", "Euro 6d-TEMP", "Zero Emission",
  ],
  descriptionTemplates: [
    "One careful owner from new. Full service history. This {{year}} {{make}} {{model}} presents in excellent condition throughout. A genuine, well-maintained example ready to drive away.",
    "Recently acquired part-exchange, now reduced for a quick sale. The {{year}} {{make}} {{model}} has been regularly serviced and comes with a fresh MOT. Viewing strongly recommended.",
    "Privately owned and cherished since new. The {{year}} {{make}} {{model}} has covered modest miles and benefits from a full dealer service history. All original paintwork.",
    "Dealership-prepared and ready to go. This {{year}} {{make}} {{model}} has been fully inspected and valeted. Comes with a 3-month dealer warranty for peace of mind.",
    "Immaculate low-mileage example. The {{year}} {{make}} {{model}} is loaded with optional extras and has only ever been used as a second car. A rare, clean find in the current market.",
    "Two owners from new, both careful. The {{year}} {{make}} {{model}} has a full documented service history and presents beautifully inside and out. No advisories on the last MOT.",
    "Well-specified example with a host of factory options. The {{year}} {{make}} {{model}} drives as well as it looks — smooth, responsive, and economical. Priced below market for a quick sale.",
    "Family-owned and very well cared for. The {{year}} {{make}} {{model}} has never been modified and is 100% standard. An honest, no-nonsense used car at a fair price.",
  ],
} as const;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

async function fetchMakes(year: number): Promise<ApiMake[]> {
  const { data } = await axios.get<ApiResponse<ApiMake>>(`${API_BASE}/makes`, {
    headers: API_HEADERS,
    params:  { year, sort: "id", direction: "asc", limit: 50, page: 1 },
  });
  return data.data;
}

async function fetchModels(year: number, makeId: number): Promise<ApiModel[]> {
  const { data } = await axios.get<ApiResponse<ApiModel>>(`${API_BASE}/models`, {
    headers: API_HEADERS,
    params:  { year, make_id: makeId, sort: "id", direction: "asc", limit: 50, page: 1 },
  });
  return data.data;
}

async function fetchTrims(modelId: number): Promise<ApiTrim[]> {
  const { data } = await axios.get<ApiResponse<ApiTrim>>(`${API_BASE}/trims`, {
    headers: API_HEADERS,
    params:  { make_model_id: modelId, sort: "id", direction: "asc", limit: 10, page: 1 },
  });
  return data.data;
}

async function fetchEngines(trimId: number): Promise<ApiEngine | null> {
  try {
    const { data } = await axios.get<ApiResponse<ApiEngine>>(`${API_BASE}/engines`, {
      headers: API_HEADERS,
      params:  { make_model_trim_id: trimId, limit: 1 },
    });
    return data.data[0] ?? null;
  } catch { return null; }
}

async function fetchBody(trimId: number): Promise<ApiBody | null> {
  try {
    const { data } = await axios.get<ApiResponse<ApiBody>>(`${API_BASE}/bodies`, {
      headers: API_HEADERS,
      params:  { make_model_trim_id: trimId, limit: 1 },
    });
    return data.data[0] ?? null;
  } catch { return null; }
}

async function fetchMileage(trimId: number): Promise<ApiMileage | null> {
  try {
    const { data } = await axios.get<ApiResponse<ApiMileage>>(`${API_BASE}/mileages`, {
      headers: API_HEADERS,
      params:  { make_model_trim_id: trimId, limit: 1 },
    });
    return data.data[0] ?? null;
  } catch { return null; }
}

function buildForgedFields(makeName: string, modelName: string, year: number) {
  const condition = pick(POOL.conditions);

  const mileageRanges = {
    excellent: [3000,   35000],
    good:      [15000,  65000],
    fair:      [40000, 110000],
    poor:      [70000, 175000],
  } as const;

  const [mMin, mMax] = mileageRanges[condition];

  const template = pick(POOL.descriptionTemplates);
  const description = template
    .replace(/{{year}}/g,  String(year))
    .replace(/{{make}}/g,  makeName)
    .replace(/{{model}}/g, modelName);

  return {
    title:           `${year} ${makeName} ${modelName}`,
    name:            `${makeName} ${modelName} ${year}`,
    description,
    price:           roundTo(randInt(4500, 55000), 50),
    odometer_miles:  roundTo(randInt(mMin, mMax), 100),
    previous_owners: pick([1, 1, 1, 2, 2, 3, 4] as const),
    condition,
    colour:          pick(POOL.colours),
    seller_details: {
      name:        pick(POOL.sellerNames),
      location:    pick(POOL.locations),
      seller_type: pick(POOL.sellerTypes),
    },
    MOT_expiry:      pick(POOL.motExpiries),
    road_tax:        pick(POOL.roadTax),
    emissions_class: pick(POOL.emissionsClasses),
    images:          [] as string[],
    status:          "active" as const,
  };
}

async function seed(): Promise<void> {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("✅ Connected to MongoDB");

  const makes = await fetchMakes(SEED_YEAR);
  console.log(`   Found ${makes.length} makes for ${SEED_YEAR}`);

  const documents: object[] = [];

  outer: for (const make of makes) {
    const models = await fetchModels(SEED_YEAR, make.id);

    for (const model of models) {
      const trims = await fetchTrims(model.id);

      const trimDetails = await Promise.all(
        trims.map(async (trim) => {
          const [engine, body, mileage] = await Promise.all([
            fetchEngines(trim.id),
            fetchBody(trim.id),
            fetchMileage(trim.id),
          ]);
          return { trim, engine, body, mileage };
        })
      );

      const newDocs = trimDetails.map(({ trim, engine, body, mileage }) => ({
        vehicle: {
          make:  { api_id: make.id,  name: make.name },
          model: { api_id: model.id, name: model.name, make_id: make.id },
          trim:  { api_id: trim.id,  name: trim.name, year: trim.year },
          ...(engine && {
            engine: {
              api_id:        engine.id,
              engine_type:   engine.engine_type,
              fuel_type:     engine.fuel_type,
              cylinders:     engine.cylinders,
              size:          engine.size,
              horsepower_hp: engine.horsepower_hp,
              torque_ft_lbs: engine.torque_ft_lbs,
              drive_type:    engine.drive_type,
              transmission:  engine.transmission,
            },
          }),
          ...(body && {
            body: {
              api_id: body.id,
              type:   body.type,
              doors:  body.doors,
              seats:  body.seats,
            },
          }),
          ...(mileage && {
            mileage: {
              api_id:                    mileage.id,
              combined_mpg:              mileage.combined_mpg,
              epa_city_mpg:              mileage.epa_city_mpg,
              epa_highway_mpg:           mileage.epa_highway_mpg,
              fuel_tank_capacity:        mileage.fuel_tank_capacity,
              battery_capacity_electric: mileage.battery_capacity_electric ?? null,
            },
          }),
        },
        ...buildForgedFields(make.name, model.name, trim.year),
      }));

      const remaining = SEED_LIMIT - documents.length;
      documents.push(...newDocs.slice(0, remaining));
      console.log(`   ${documents.length}/${SEED_LIMIT} documents prepared`);
      if (documents.length >= SEED_LIMIT) break outer;
    }
  }

  const inserted = await Listing.insertMany(documents, { ordered: false });
  console.log(`✅ Inserted ${inserted.length} listings`);

  await mongoose.disconnect();
  console.log("✅ Done");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  console.error(err.response?.status);
  console.error(err.response?.data);
  process.exit(1);
});