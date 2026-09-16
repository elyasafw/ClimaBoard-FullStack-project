import services.favorites_service as f
from fastapi import APIRouter, HTTPException, Path
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field


class NewFavorite(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    country: str = Field(..., min_length=1, max_length=100)


router = APIRouter(prefix="/favorites/{name}")

NamePath = Path(..., min_length=1, max_length=50)


@router.get("")
def get_favorites(name: str = NamePath):
    favorites = f.read_favorites()
    user = f.get_user_by_name(favorites, name)

    if not user:
        raise HTTPException(404, {"success": False, "error": f"user {name} not found"})

    return JSONResponse(content={"success": True, "data": user})


@router.post("")
def create_favorites(name: str = NamePath):
    favorites = f.read_favorites()
    if f.get_user_by_name(favorites, name):
        raise HTTPException(
            409, {"success": False, "error": f"user {name} already exist"}
        )

    f.create_new_favorite(favorites, name)
    return JSONResponse(
        content={"success": True, "message": "new user created successfully"},
        status_code=201,
    )


@router.put("")
def update_favorites(new_favorite: NewFavorite, name: str = NamePath):
    favorites = f.read_favorites()
    user = f.get_user_by_name(favorites, name)

    if not user:
        raise HTTPException(
            status_code=404,
            detail={"success": False, "error": f"user {name} not found"},
        )

    f.update_favorite(favorites, new_favorite.model_dump(), user)
    return JSONResponse(
        content={"success": True, "message": "new favorite added successfully"}
    )


@router.delete("/{id}")
def delete_favorite(id: int, name: str = NamePath):
    favorites = f.read_favorites()
    user = f.get_user_by_name(favorites, name)

    if not user:
        raise HTTPException(
            status_code=404,
            detail={"success": False, "error": f"user {name} not found"},
        )

    if not f.get_favorite_by_id(user["favorites"], id):
        raise HTTPException(
            status_code=404,
            detail={"success": False, "error": f"favorite ID: {id} not found in list"},
        )

    f.delete_favorite(favorites, id, user)
    return JSONResponse(
        content={"success": True, "message": "favorite deleted successfully"}
    )
