from fastapi import APIRouter, HTTPException, Depends
from fastapi_jwt_auth import AuthJWT
from app.schemas.user import User
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/login")
def login(user: User, Authorize: AuthJWT = Depends()):
    if not AuthService.verify_user(user):
        raise HTTPException(status_code=401, detail="Bad username or password")

    access_token = Authorize.create_access_token(subject=user.username)
    return {"access_token": access_token}
