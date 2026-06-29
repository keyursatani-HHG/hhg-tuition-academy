"""Reusable mapped-column types and mixins for ORM models."""

from datetime import datetime
from typing import Annotated

from sqlalchemy import BigInteger, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

# Auto-incrementing primary key
intpk = Annotated[int, mapped_column(BigInteger, primary_key=True, autoincrement=True)]


class TimestampMixin:
    """Adds created_at / updated_at columns managed by the database."""

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
