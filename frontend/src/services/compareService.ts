import { api } from "../api/axios";
import type { WeatherData } from "./weatherService";

export interface CompareData {
    first: WeatherData;
    second: WeatherData;
}

export function getComparison(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
) {
    return api.get<CompareData>("/cities/compare", {
        params: { lat1, lon1, lat2, lon2 },
    });
}
