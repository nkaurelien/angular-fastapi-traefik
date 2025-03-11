from fastapi_jwt_auth import AuthJWT
from pydantic import BaseModel


class Settings(BaseModel):
    authjwt_algorithm: str = "HS256"
    authjwt_secret_key: str = "secret123"


@AuthJWT.load_config
def get_config():
    return Settings()
