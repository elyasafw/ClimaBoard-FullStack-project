from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def get_health():
    return {"message": "Server running successfully"}


@router.get("/atbash")
def atbash():
    pass
