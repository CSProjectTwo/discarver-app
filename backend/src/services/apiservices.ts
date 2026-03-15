import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://car-api2.p.rapidapi.com";

export interface Make {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
  make_id: number;
  make: Make;
}

export interface Trim {
  id: number;
  make_model_id: number;
  year: number;
  name: string;
  description: string;
  msrp: number;
  invoice: number;
  created: string;
  modified: string;
}

export interface Body {
  id: number;
  make_model_trim_id: number;
  type: string;
  doors: number;
  seats: number;
}

export interface Mileage {
  id: number;
  make_model_trim_id: number;
  fuel_tank_capacity: string;
  combined_mpg: number;
  epa_city_mpg: number;
  epa_highway_mpg: number;
  range_city: number;
  range_highway: number;
  battery_capacity_electric: string | null;
  epa_time_to_charge_hr_240v:number | null;
}

export interface Engine {
  id: number;
  make_model_trim_id: number;
  engine_type: string;
  fuel_type: string;
  cylinders: string;
  size: string;
  horsepower_hp:number;
  horsepower_rpm: number;
  torque_ft_lbs: number;
  torque_rpm: number; 
  valves: number;
  valve_timing: string;
  cam_type: string;
  drive_type: string;
  transmission: string;
}

export interface MakesResponse { data: Make[];    }
export interface ModelResponse { data: Model[];   }
export interface TrimResponse { data: Trim[];    }
export interface BodyResponse { data: Body[];    }
export interface MileageResponse { data: Mileage[]; }
export interface EngineResponse { data: Engine[];  }





export async function getMakes(year: number): Promise<Make[]> {
  try {
    const response = await axios.get<MakesResponse>(
      `${BASE_URL}/api/makes`,
      {
        params: { year },
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": process.env.API_HOST,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch makes");
  }
}

export async function getModels(make: string, year: number): Promise<Model[]> {
  try {
    const response = await axios.get<ModelResponse>(
      `${BASE_URL}/api/models`,
      {
        params: { make, year },
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": process.env.API_HOST,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch models");
  }
}

export async function getBodies(): Promise<Body[]> {
  try {
    const response = await axios.get<BodyResponse>(
      `${BASE_URL}/api/bodies`,
      {
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": process.env.API_HOST,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch bodies");
  }
}

export async function getMileages(): Promise<Mileage[]> {
  try {
    const response = await axios.get<MileageResponse>(
      `${BASE_URL}/api/mileages`,
      {
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": process.env.API_HOST,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch mileages");
  }
}

export async function getEngines(): Promise<Engine[]> {
  try {
    const response = await axios.get<EngineResponse>(
      `${BASE_URL}/api/engines`,
      {
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": process.env.API_HOST,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch engines");
  }
}
