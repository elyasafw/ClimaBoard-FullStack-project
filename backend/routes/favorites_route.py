from fastapi import APIRouter

router = APIRouter(prefix="/favorites")


@router.get("/")
def get_favorites():
    pass


@router.post("/")
def create_favorites():
    pass


@router.put("/")
def update_favorites():
    pass


@router.delete("/")
def delete_favorite():
    pass
