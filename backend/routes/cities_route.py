from fastapi import APIRouter, Query
from services.cities_service import get_cities_by_name
from services.weather_service import get_weather_by_coordinates

router = APIRouter(prefix="/cities")


@router.get("/search")
def search_city(city_name: str = Query(..., min_length=2, max_length=100)):
    return get_cities_by_name(city_name)


@router.get("/compare")
def compare(
    lat1: float = Query(..., ge=-90, le=90),
    lon1: float = Query(..., ge=-180, le=180),
    lat2: float = Query(..., ge=-90, le=90),
    lon2: float = Query(..., ge=-180, le=180),
):
    return {
        "first": get_weather_by_coordinates(lat1, lon1),
        "second": get_weather_by_coordinates(lat2, lon2),
    }
