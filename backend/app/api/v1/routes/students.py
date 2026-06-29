"""Student routes (admin-only management)."""

from fastapi import APIRouter, HTTPException, Query, status

from app.api.deps import CurrentAdmin, DbSession
from app.models.student import Student
from app.repositories.base import BaseRepository
from app.schemas.common import Message, Page
from app.schemas.student import StudentCreate, StudentRead, StudentUpdate

router = APIRouter(prefix="/students", tags=["students"])


def _repo(session) -> BaseRepository:
    return BaseRepository(Student, session)


@router.get("", response_model=Page[StudentRead], summary="List students (admin)")
async def list_students(
    session: DbSession,
    _admin: CurrentAdmin,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
):
    r = _repo(session)
    items = await r.list(skip=skip, limit=limit, order_by="id")
    total = await r.count()
    return Page(items=items, total=total, skip=skip, limit=limit)


@router.post(
    "",
    response_model=StudentRead,
    status_code=status.HTTP_201_CREATED,
    summary="Register a student (admin)",
)
async def create_student(payload: StudentCreate, session: DbSession, _admin: CurrentAdmin):
    return await _repo(session).create(payload.model_dump())


@router.get("/{student_id}", response_model=StudentRead, summary="Get a student (admin)")
async def get_student(student_id: int, session: DbSession, _admin: CurrentAdmin):
    obj = await _repo(session).get(student_id)
    if obj is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return obj


@router.put("/{student_id}", response_model=StudentRead, summary="Update a student (admin)")
async def update_student(
    student_id: int, payload: StudentUpdate, session: DbSession, _admin: CurrentAdmin
):
    r = _repo(session)
    obj = await r.get(student_id)
    if obj is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return await r.update(obj, payload.model_dump(exclude_unset=True))


@router.delete("/{student_id}", response_model=Message, summary="Delete a student (admin)")
async def delete_student(student_id: int, session: DbSession, _admin: CurrentAdmin):
    deleted = await _repo(session).delete_by_id(student_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Student not found")
    return Message(detail=f"Student {student_id} deleted")
