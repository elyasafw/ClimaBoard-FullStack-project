import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CurrentWeather from "../components/CurrentWeather";
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

                    setLocation("📍 המיקום הנוכחי שלך");
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

    const { data: weather, error: weatherError, loading } =
        useFetch<WeatherData>(weatherFetch);

    if (!context) {
        return <p>Error: UserContext is missing</p>;
    }

    const { userName } = context;

    return (
        <div className="page-center home-page">
            <h2>שלום {userName}</h2>

            <p className="home-location">{location}</p>
            {loading && <p>טוען מזג אוויר...</p>}
            <CurrentWeather
                weather={weather ? weather.current : null}
                weatherError={weatherError}
            />

            <div className="home-shortcuts">
                <Link to="/search" className="shortcut-btn">
                    חיפוש
                </Link>
                <Link to="/compare" className="shortcut-btn">
                    השוואה
                </Link>
                <Link to="/favorites" className="shortcut-btn">
                    מועדפים
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
