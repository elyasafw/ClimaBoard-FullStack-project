import requests

from .weather_service import get_weather_by_coordinates

URL = "https://geocoding-api.open-meteo.com/v1/search"


def get_cities_by_name(name):

    params = {"name": name, "count": 5}

    try:
        response = requests.get(URL, params=params)
        response.raise_for_status()
        data = response.json()["results"]

        return {"success": True, "data": data, "count": len(data)}
    except requests.exceptions.RequestException as e:
        print(f"ERROR: {e}")
        return {}


def weather_comparison_between_cities(city1, city2):
    print(city1, city1)
    latitude = [city1["latitude"], city2["latitude"]]
    longitude = [city1["longitude"], city2["longitude"]]
    data = get_weather_by_coordinates(latitude, longitude)
    return data
