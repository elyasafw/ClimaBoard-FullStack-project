import requests
from fastapi import HTTPException

URL = "https://geocoding-api.open-meteo.com/v1/search?language=he"


def get_cities_by_name(name):

    params = {"name": name, "count": 5}

    try:
        response = requests.get(URL, params=params)
        response.raise_for_status()
        data = response.json()

        return data
    except requests.exceptions.RequestException as e:
        print(f"ERROR: {e}")
        raise HTTPException(
            status_code=503, detail={"error": "cities service is unavailable"}
        )
