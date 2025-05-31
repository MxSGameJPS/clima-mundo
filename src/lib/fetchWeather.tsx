// lib/fetchWeather.ts
import { WeatherData } from "../types/weatherAPI";

const API_KEY = "c1ba22e362004345a98143807253105";
export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&lang=pt`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar dados do clima");
  }

  const data: WeatherData = await res.json();
  return data;
};
