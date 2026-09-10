import services.favorites_service as f
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class NewFavorite(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    country: str


router = APIRouter(prefix="/favorites/{name}")


@router.get("/")
def get_favorites(name):
    favorites = f.read_favorites()
    user = f.get_user_by_name(favorites, name)

    if not user:
        raise HTTPException(404, {"success": False, "error": f"user {name} not found"})

    return {"success": True, "data": user}


@router.post("/")
def create_favorites(user_name):
    favorites = f.read_favorites()
    if f.get_user_by_name(favorites, user_name):
        raise HTTPException(
            409, {"success": False, "error": f"user {user_name} already exist"}
        )

    f.create_new_favorite(favorites, user_name)
    return JSONResponse(
        content={"success": True, "message": "new user created successfully"},
        status_code=201,
    )


@router.put("/")
def update_favorites(name, new_favorite: NewFavorite):
    favorites = f.read_favorites()
    user = f.get_user_by_name(favorites, name)

    if not user:
        raise HTTPException(404, {"success": False, "error": f"user {name} not found"})

    f.update_favorite(favorites, new_favorite.model_dump(), user)
    return {"success": True, "message": "new favorite added successfully"}


@router.delete("/{id}")
def delete_favorite(name, id: int):
    favorites = f.read_favorites()
    user = f.get_user_by_name(favorites, name)

    if not user:
        raise HTTPException(404, {"success": False, "error": f"user {name} not found"})

    if not f.get_favorite_by_id(user["favorites"], id):
        raise HTTPException(
            404, {"success": False, "error": f"favorite ID: {id} not found in list"}
        )

    f.delete_favorite(favorites, id, user)
    return {"success": True, "message": "favorite delted successfully"}
