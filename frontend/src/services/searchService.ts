import { api } from "../api/axios";

export type SearchData = {
    results: {
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        country?: string;
        admin1?: string;
    }[];
};

export function getSearchResults(cityName: string) {
    return api.get<SearchData>("/cities/search", {
        params: { city_name: cityName },
    });
}
