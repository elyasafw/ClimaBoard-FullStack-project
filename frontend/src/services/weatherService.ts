import { api } from "../api/axios";

export interface WeatherData {
    current: {
        temperature_2m: number;
        wind_speed_10m: number;
        is_day: boolean;
        rain: boolean;
        snowfall: boolean;
        precipitation: number;
    };
    daily: {
        time: string[];
        temperature_2m_mean: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        uv_index_max: number[];
        rain_sum: number[];
        snowfall_sum: number[];
        precipitation_sum: number[];
    };
}

export function getWeather(latitude: number, longitude: number) {
    return api.get<WeatherData>("/weather", {
        params: { latitude, longitude },
    });
}
