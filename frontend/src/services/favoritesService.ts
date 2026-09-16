import { api } from "../api/axios";

export interface Favorite {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
}

export interface FavoritesData {
    name: string;
    favorites: Favorite[];
}

export function getFavorites(explorerName: string) {
    return api.get<{ success: boolean; data: FavoritesData }>(
        `/favorites/${explorerName}`,
    );
}

export function createExplorer(explorerName: string) {
    return api.post(`/favorites/${explorerName}`);
}

export function addFavorite(explorerName: string, favorite: Favorite) {
    return api.put(`/favorites/${explorerName}`, favorite);
}

export function removeFavorite(explorerName: string, id: number) {
    return api.delete(`/favorites/${explorerName}/${id}`);
}
