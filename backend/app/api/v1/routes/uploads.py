"""Image upload endpoint (admin-only). Stores files under settings.UPLOAD_DIR
and serves them via the /uploads static mount configured in app.main."""

import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException, UploadFile, status
from pydantic import BaseModel

from app.api.deps import CurrentAdmin
from app.core.config import settings

router = APIRouter(prefix="/uploads", tags=["uploads"])

ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
}


class UploadResult(BaseModel):
    url: str
    filename: str


@router.post("/image", response_model=UploadResult, summary="Upload an image (admin)")
async def upload_image(file: UploadFile, _admin: CurrentAdmin) -> UploadResult:
    ext = ALLOWED_TYPES.get(file.content_type or "")
    if ext is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file type. Upload a JPEG, PNG, WebP or GIF image.",
        )

    contents = await file.read()
    if len(contents) > settings.MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large (max {settings.MAX_UPLOAD_BYTES // (1024 * 1024)} MB).",
        )

    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{uuid.uuid4().hex}{ext}"
    (upload_dir / filename).write_bytes(contents)

    # Relative URL; the frontend prefixes it with the API origin.
    return UploadResult(url=f"/uploads/{filename}", filename=filename)
