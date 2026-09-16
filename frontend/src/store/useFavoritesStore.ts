import { create } from "zustand";
import {
    addFavorite as addFavoriteRequest,
    getFavorites,
    removeFavorite as removeFavoriteRequest,
    type Favorite,
} from "../services/favoritesService";

interface FavoritesState {
    favorites: Favorite[];
    loaded: boolean;
    loading: boolean;
    error: string | null;
    fetchFavorites: (explorerName: string) => Promise<void>;
    addFavorite: (explorerName: string, favorite: Favorite) => Promise<void>;
    removeFavorite: (explorerName: string, id: number) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
    favorites: [],
    loaded: false,
    loading: false,
    error: null,

    fetchFavorites: async (explorerName) => {
        set({ loading: true });
        try {
            const response = await getFavorites(explorerName);
            set({
                favorites: response.data.data.favorites,
                loaded: true,
                loading: false,
                error: null,
            });
        } catch {
            set({
                favorites: [],
                loaded: true,
                loading: false,
                error: "שגיאה בשליפת המועדפים",
            });
        }
    },

    addFavorite: async (explorerName, favorite) => {
        await addFavoriteRequest(explorerName, favorite);
        set((state) => ({ favorites: [...state.favorites, favorite] }));
    },

    removeFavorite: async (explorerName, id) => {
        await removeFavoriteRequest(explorerName, id);
        set((state) => ({
            favorites: state.favorites.filter((f) => f.id !== id),
        }));
    },
}));
