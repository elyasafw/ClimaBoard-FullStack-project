from fastapi import APIRouter

router = APIRouter(prefix="/cities")


@router.get("/search")
def search_city():
    pass


@router.get("/compare")
def compare():
    pass
