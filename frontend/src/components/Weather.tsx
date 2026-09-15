import type { WeatherData } from "../services/weatherService";

const Weather = ({
    weather,
    weatherError,
}: {
    weather: WeatherData | null;
    weatherError: string | null;
}) => {
    return (
        <>
            {weatherError && <p>שגיאה בקבלת נתוני מזג האוויר</p>}
            {weather && (
                <p>
                    {weather.current.is_day ? "☀️" : "🌙"}{" "}
                    {weather.current.temperature_2m}°C | רוח:{" "}
                    {weather.current.wind_speed_10m} קמ"ש{" "}
                </p>
            )}
        </>
    );
};

export default Weather;
