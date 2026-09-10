import requests

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
