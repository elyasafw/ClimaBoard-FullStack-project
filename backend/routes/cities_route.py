from fastapi import APIRouter
from services.cities_service import get_cities_by_name
from services.weather_service import get_weather_by_coordinates

router = APIRouter(prefix="/cities")


@router.get("/search")
def search_city(city_name):
    return get_cities_by_name(city_name)


@router.get("/compare")
def compare(lat1: float, lon1: float, lat2: float, lon2: float):
    return {
        "first": get_weather_by_coordinates(lat1, lon1),
        "second": get_weather_by_coordinates(lat2, lon2),
    }
