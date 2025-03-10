from fastapi import APIRouter
from fastapi.responses import Response

router = APIRouter()


@router.get("/healthcheck")
async def healthcheck():
    return Response()
