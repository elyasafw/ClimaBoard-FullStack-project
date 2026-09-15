import type { WeatherData } from "../services/weatherService";

const CurrentWeather = ({
    weather,
    weatherError,
}: {
    weather: WeatherData["current"] | null;
    weatherError: string | null;
}) => {
    return (
        <>
            {weatherError && <p>שגיאה בקבלת נתוני מזג האוויר</p>}
            {weather && (
                <p>
                    {weather.is_day ? "☀️" : "🌙"}{" "}
                    {weather.temperature_2m} °C | רוח:{" "}
                    {weather.wind_speed_10m} קמ"ש{" "}
                    {weather.rain ? "🌧️" : ""}
                    {weather.snowfall ? "❄️" : ""} | משקעים:{" "}
                    {weather.precipitation} מ"מ
                </p>
            )}
        </>
    );
};

export default CurrentWeather;
