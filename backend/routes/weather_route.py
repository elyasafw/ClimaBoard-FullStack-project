from fastapi import APIRouter

router = APIRouter(prefix="/weather")


@router.get("/current")
def current_weather():
    pass


@router.get("/future")
def future_weather():
    pass
