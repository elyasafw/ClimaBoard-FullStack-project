import requests

URL = "https://api.open-meteo.com/v1/forecast"

params = {
    "daily": [
        "temperature_2m_mean",
        "temperature_2m_max",
        "temperature_2m_min",
        "uv_index_max",
        "rain_sum",
        "snowfall_sum",
        "precipitation_sum",
    ],
    "current": [
        "temperature_2m",
        "wind_speed_10m",
        "is_day",
        "precipitation",
        "rain",
        "snowfall",
    ],
    "timezone": "auto",
}


def get_weather_by_coordinates(lat: float, lon: float):

    try:
        response = requests.get(
            URL, params={"latitude": lat, "longitude": lon, **params}
        )
        response.raise_for_status()
        data = response.json()

        return data
    except requests.exceptions.RequestException as e:
        print(f"ERROR: {e}")
        return {}
