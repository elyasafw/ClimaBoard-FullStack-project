import type { WeatherData } from "../services/weatherService";

const CityWeather = ({
    name,
    cityWeather,
    weatherError,
}: {
    name: string | null;
    cityWeather: WeatherData["daily"] | null;
    weatherError: string | null;
}) => {
    return (
        <>
            {name && <h3>{name}</h3>}
            {weatherError && <p>שגיאה בקבלת נתוני מזג האוויר</p>}
            {cityWeather && (
                <table>
                    <thead>
                        <tr>
                            <th>תאריך</th>
                            <th>מינ'</th>
                            <th>מקס'</th>
                            <th>ממוצע</th>
                            <th>UV</th>
                            <th>גשם</th>
                            <th>שלג</th>
                            <th>משקעים</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cityWeather.time.map((date, i) => (
                            <tr key={date}>
                                <td>{date}</td>
                                <td>{cityWeather.temperature_2m_min[i]}</td>
                                <td>{cityWeather.temperature_2m_max[i]}</td>
                                <td>{cityWeather.temperature_2m_mean[i]}</td>
                                <td>{cityWeather.uv_index_max[i]}</td>
                                <td>{cityWeather.rain_sum[i]}</td>
                                <td>{cityWeather.snowfall_sum[i]}</td>
                                <td>{cityWeather.precipitation_sum[i]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default CityWeather;
