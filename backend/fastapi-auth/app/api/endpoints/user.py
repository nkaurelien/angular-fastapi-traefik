from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
import requests

router = APIRouter()

@router.get("/user")
def user(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    current_user = Authorize.get_jwt_subject()

    # Fetch user data from the external API
    response = requests.get("https://jsonplaceholder.typicode.com/users/1")

    if response.status_code == 200:
        user_data = response.json()
        # You can add additional logic here to process the user data if needed
        return {"sub": current_user, "user_data": user_data}
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to retrieve user data")
