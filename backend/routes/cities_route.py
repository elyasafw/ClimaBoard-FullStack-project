from fastapi import APIRouter
from pydantic import BaseModel
from services.cities_service import (
    get_cities_by_name,
    weather_comparison_between_cities,
)


class CityModel(BaseModel):
    latitude: float
    longitude: float


class CompareModel(BaseModel):
    city1: CityModel
    city2: CityModel


router = APIRouter(prefix="/cities")


@router.get("/search")
def search_city(city_name):
    return get_cities_by_name(city_name)


@router.post("/compare")
def compare(body: CompareModel):
    data = body.model_dump()
    return weather_comparison_between_cities(data["city1"], data["city2"])
