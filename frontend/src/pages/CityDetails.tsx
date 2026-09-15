import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CityWeather from "../components/CityWeather";
import { useFetch } from "../hooks/useFetch";
import { getWeather, type WeatherData } from "../services/weatherService";

const CityDetails = () => {
    const [searchParams] = useSearchParams();
    const lat = Number(searchParams.get("lat"));
    const lon = Number(searchParams.get("lon"));
    const name = searchParams.get("name");

    const weatherFetch = useMemo(() => {
        return () => getWeather(lat, lon);
    }, [lat, lon]);

    const { data: weather, error: weatherError } =
        useFetch<WeatherData>(weatherFetch);

    return (
        <CityWeather
            name={name}
            cityWeather={weather ? weather.daily : null}
            weatherError={weatherError}
        />
    );
};

export default CityDetails;
