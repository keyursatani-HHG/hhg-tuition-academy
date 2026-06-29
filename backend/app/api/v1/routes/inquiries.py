"""Inquiry routes: public submission + admin management."""

from fastapi import APIRouter, HTTPException, Query, status

from app.api.deps import CurrentAdmin, DbSession
from app.models.inquiry import Inquiry, InquiryStatus
from app.repositories.base import BaseRepository
from app.schemas.common import Message, Page
from app.schemas.inquiry import InquiryCreate, InquiryRead, InquiryUpdate

router = APIRouter(prefix="/inquiries", tags=["inquiries"])


def _repo(session) -> BaseRepository:
    return BaseRepository(Inquiry, session)


@router.post(
    "",
    response_model=InquiryRead,
    status_code=status.HTTP_201_CREATED,
    summary="Submit an inquiry (public contact form)",
)
async def create_inquiry(payload: InquiryCreate, session: DbSession):
    data = payload.model_dump()
    data["status"] = InquiryStatus.new
    return await _repo(session).create(data)


@router.get(
    "",
    response_model=Page[InquiryRead],
    summary="List inquiries (admin)",
)
async def list_inquiries(
    session: DbSession,
    _admin: CurrentAdmin,
    status_filter: InquiryStatus | None = Query(default=None, alias="status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
):
    r = _repo(session)
    filters = {"status": status_filter} if status_filter else {}
    # newest first
    items = await r.list(skip=skip, limit=limit, order_by="id", **filters)
    items = list(reversed(items)) if not skip else items
    total = await r.count(**filters)
    return Page(items=items, total=total, skip=skip, limit=limit)


@router.get("/{inquiry_id}", response_model=InquiryRead, summary="Get an inquiry (admin)")
async def get_inquiry(inquiry_id: int, session: DbSession, _admin: CurrentAdmin):
    obj = await _repo(session).get(inquiry_id)
    if obj is None:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return obj


@router.put(
    "/{inquiry_id}",
    response_model=InquiryRead,
    summary="Update inquiry status (admin)",
)
async def update_inquiry(
    inquiry_id: int,
    payload: InquiryUpdate,
    session: DbSession,
    _admin: CurrentAdmin,
):
    r = _repo(session)
    obj = await r.get(inquiry_id)
    if obj is None:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return await r.update(obj, payload.model_dump(exclude_unset=True))


@router.delete("/{inquiry_id}", response_model=Message, summary="Delete an inquiry (admin)")
async def delete_inquiry(inquiry_id: int, session: DbSession, _admin: CurrentAdmin):
    deleted = await _repo(session).delete_by_id(inquiry_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return Message(detail=f"Inquiry {inquiry_id} deleted")
