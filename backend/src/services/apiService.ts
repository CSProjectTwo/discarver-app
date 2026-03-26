import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://car-api2.p.rapidapi.com";

interface Make {
  id:   number;
  name: string;
}

interface MakesResponse {
  data: Make[];
}

interface Model {
  id:      number;
  name:    string;
  make_id: number;
}

interface ModelResponse {
  data: Model[];
}

const headers = {
  "x-rapidapi-key":  process.env.API_KEY  as string,
  "x-rapidapi-host": process.env.API_HOST as string,
};

export async function getMakes(year: number): Promise<Make[]> {
  try {
    const response = await axios.get<MakesResponse>(`${BASE_URL}/api/makes`, {
      params: { year },
      headers,
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data ?? error.message);
    }
    throw new Error("Failed to fetch makes");
  }
}

export async function getModels(make: string, year: number): Promise<Model[]> {
  try {
    const response = await axios.get<ModelResponse>(`${BASE_URL}/api/models`, {
      params: { make, year },
      headers,
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data ?? error.message);
    }
    throw new Error("Failed to fetch models");
  }
}