from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.cities_route import router as cities_router
from routes.favorites_route import router as favorites_router
from routes.general_route import router as general_router
from routes.weather_route import router as weather_router

server = FastAPI()

origins = ["http://localhost:5173"]

server.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

server.include_router(general_router, tags=["general"])
server.include_router(weather_router, tags=["weather"])
server.include_router(cities_router, tags=["cities"])
server.include_router(favorites_router, tags=["favorites"])
