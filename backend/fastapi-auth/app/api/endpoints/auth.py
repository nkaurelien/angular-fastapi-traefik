from fastapi import APIRouter, HTTPException, Depends
from fastapi_jwt_auth import AuthJWT
from app.schemas.user import User
from app.services.auth_service import AuthService
import structlog

router = APIRouter()

logger = structlog.get_logger()

@router.post("/login")
def login(user: User, Authorize: AuthJWT = Depends()):
    try:
        if not AuthService.verify_user(user):
            raise HTTPException(status_code=401, detail="Bad username or password")

        access_token = Authorize.create_access_token(subject=user.username)
        return {"access_token": access_token}

    except Exception as e:
        # Log the exception (optional, depending on your logging setup)
        logger.error(f"Error during login: {e}")

        # Return a generic error message to the client
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
