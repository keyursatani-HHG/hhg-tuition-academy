"""SQLAlchemy ORM models. Importing them here registers their tables on
`Base.metadata` so Alembic autogenerate can discover them."""

from app.models.admin_user import AdminUser

__all__ = ["AdminUser"]
