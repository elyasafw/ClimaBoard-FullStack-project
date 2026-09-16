import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CityWeather from "../components/CityWeather";
import { useFetch } from "../hooks/useFetch";
import { getWeather, type WeatherData } from "../services/weatherService";
import { UserContext } from "../store/UsersContext";
import { useFavoritesStore } from "../store/useFavoritesStore";

const CityDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const lat = Number(searchParams.get("lat"));
    const lon = Number(searchParams.get("lon"));
    const name = searchParams.get("name");
    const country = searchParams.get("country") ?? "לא ידוע";

    const context = useContext(UserContext);
    const { favorites, loaded, fetchFavorites, addFavorite, removeFavorite } =
        useFavoritesStore();
    const [favoriteError, setFavoriteError] = useState<string | null>(null);

    const cityId = Number(id);
    const isFavorite = favorites.some((f) => f.id === cityId);

    useEffect(() => {
        if (context?.userName && !loaded) {
            fetchFavorites(context.userName);
        }
    }, [context?.userName, loaded, fetchFavorites]);

    const weatherFetch = useMemo(() => {
        return () => getWeather(lat, lon);
    }, [lat, lon]);

    const { data: weather, error: weatherError } =
        useFetch<WeatherData>(weatherFetch);

    useEffect(() => {
        setFavoriteError(null);
    }, [cityId]);

    if (!context) {
        return <p>Error: UserContext is missing</p>;
    }

    const handleToggleFavorite = async () => {
        try {
            if (isFavorite) {
                await removeFavorite(context.userName, cityId);
            } else if (name) {
                await addFavorite(context.userName, {
                    id: cityId,
                    name,
                    latitude: lat,
                    longitude: lon,
                    country,
                });
            }
            setFavoriteError(null);
        } catch {
            setFavoriteError("שגיאה בעדכון המועדפים");
        }
    };

    return (
        <>
            <CityWeather
                name={name}
                cityWeather={weather ? weather.daily : null}
                weatherError={weatherError}
            />
            <button onClick={handleToggleFavorite}>
                {isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
            </button>
            {favoriteError && <p>{favoriteError}</p>}
        </>
    );
};

export default CityDetails;
