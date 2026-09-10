from fastapi import APIRouter
from services.weather_service import get_weather_by_coordinates

router = APIRouter(prefix="/weather")


@router.get("/")
def get_weather(latitude, longitude):
    return get_weather_by_coordinates(latitude, longitude)
