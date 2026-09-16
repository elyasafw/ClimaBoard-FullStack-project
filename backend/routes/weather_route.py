from fastapi import APIRouter, Query
from services.weather_service import get_weather_by_coordinates

router = APIRouter(prefix="/weather")


@router.get("")
def get_weather(
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
):
    return get_weather_by_coordinates(latitude, longitude)
