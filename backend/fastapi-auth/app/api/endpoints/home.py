from fastapi import APIRouter
import structlog

router = APIRouter()

logger = structlog.get_logger()


@router.get("/")
async def read_main():
    logger.info("In root path")
    return {"msg": "Hello World"}
