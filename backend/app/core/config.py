"""Application configuration via Pydantic settings (loaded from environment / .env)."""

from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ───────────── App ─────────────
    PROJECT_NAME: str = "HHG Tuition Academy API"
    API_V1_PREFIX: str = "/api/v1"
    ENVIRONMENT: str = "development"  # development | staging | production
    DEBUG: bool = True

    # ───────────── Database ─────────────
    # Async SQLAlchemy URL, e.g. postgresql+asyncpg://user:pass@host:5432/dbname
    DATABASE_URL: str = (
        "postgresql+asyncpg://hhg:hhg_password@localhost:5432/hhg_academy"
    )

    # ───────────── Security (used from Phase 4) ─────────────
    SECRET_KEY: str = "change-me-in-production-use-a-long-random-string"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ───────────── Uploads ─────────────
    # Directory (relative to the backend root) where uploaded images are stored
    # and served from under the /uploads path.
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_BYTES: int = 5 * 1024 * 1024  # 5 MB

    # ───────────── CORS ─────────────
    # Comma-separated string in env, e.g. "http://localhost:3000,https://hhg.com".
    # Kept as a raw string to avoid pydantic-settings' JSON decoding of complex
    # types; parsed into a list via `cors_origins`.
    BACKEND_CORS_ORIGINS: str = "http://localhost:3000"

    @property
    def cors_origins(self) -> List[str]:
        return [o.strip() for o in self.BACKEND_CORS_ORIGINS.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() == "production"

    @property
    def sync_database_url(self) -> str:
        """Synchronous URL (psycopg/asyncpg-stripped) for tooling that needs it."""
        return self.DATABASE_URL.replace("+asyncpg", "")


@lru_cache
def get_settings() -> Settings:
    """Cached settings singleton."""
    return Settings()


settings = get_settings()
