from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_jwt_auth.exceptions import AuthJWTException
from app.api.endpoints import health, auth, user, home
from app.core.config import logger_middleware
from app.core.exception_handlers import authjwt_exception_handler

app = FastAPI(openapi_url="/restapi/v1/openapi.json")

origins = [
    "http://localhost",
    "http://localhost:4200",
]

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],  # Allows all origins. In production, specify the allowed origins.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Middleware
app.middleware("http")(logger_middleware)
app.exception_handler(AuthJWTException)(authjwt_exception_handler)

# Include routers
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(home.router)

