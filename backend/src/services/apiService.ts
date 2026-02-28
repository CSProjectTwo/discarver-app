import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://car-api2.p.rapidapi.com";

interface Make {
  id: number;
  name: string;
}

interface MakesResponse {
  data: Make[];
}

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