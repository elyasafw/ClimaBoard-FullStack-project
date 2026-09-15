import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getWeather, type WeatherData } from "../services/weatherService";
import { UserContext } from "../store/UsersContext";

const HomePage = () => {
    const context = useContext(UserContext);

    const [location, setLocation] = useState<string>("... מזהה מיקום");
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
        null,
    );

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    setLocation(`${latitude} | ${longitude}`);
                    setCoords({ lat: latitude, lon: longitude });
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setLocation(
                            "עלייך לאשר גישה למיקום בדפדפן כדי שהשירות יעבוד",
                        );
                    } else {
                        setLocation("שגיאה בקבלת נתוני המיקום");
                    }
                },
            );
        } else {
            setLocation("הדפדפן לא תומך בזיהוי מיקום");
        }
    }, []);

    const weatherFetch = useMemo(() => {
        return coords ? () => getWeather(coords.lat, coords.lon) : null;
    }, [coords]);

    const { data: weather, error: weatherError } =
        useFetch<WeatherData>(weatherFetch);

    if (!context) {
        return <p>Error: UserContext is missing</p>;
    }

    const { userName } = context;

    return (
        <div>
            <h2>שלום {userName}</h2>
            <p>{location}</p>
            {weatherError && <p>שגיאה בקבלת נתוני מזג האוויר</p>}
            {weather && (
                <p>
                    {weather.current.is_day ? "☀️" : "🌙"}{" "}
                    {weather.current.temperature_2m}°C | רוח:{" "}
                    {weather.current.wind_speed_10m} קמ"ש{" "}
                </p>
            )}
            <div>
                <Link to="/search">חיפוש</Link>
                <Link to="/compare">השוואה</Link>
                <Link to="/favorites">מועדפים</Link>
            </div>
        </div>
    );
};

export default HomePage;
