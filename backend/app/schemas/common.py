"""Shared schema helpers."""

from typing import Generic, Sequence, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class Page(BaseModel, Generic[T]):
    """Paginated list response."""

    items: Sequence[T]
    total: int
    skip: int
    limit: int


class Message(BaseModel):
    detail: str
