import { api } from "../api/axios";

export interface WeatherData {
    current: {
        temperature_2m: number;
        wind_speed_10m: number;
        is_day: boolean;
    };
}

export function getWeather(latitude: number, longitude: number) {
    return api.get<WeatherData>("/weather", {
        params: { latitude, longitude },
    });
}
