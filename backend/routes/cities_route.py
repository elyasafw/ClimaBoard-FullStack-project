from fastapi import APIRouter, Query
from services.cities_service import get_cities_by_name
from services.weather_service import get_weather_by_coordinates

router = APIRouter(prefix="/cities")


@router.get("/search")
def search_city(city_name):
    return get_cities_by_name(city_name)


@router.get("/compare")
def compare(
    longitudes: list[float] = Query(...),
    latitudes: list[float] = Query(...),
):
    return get_weather_by_coordinates(longitudes, latitudes)
