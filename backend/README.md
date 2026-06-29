# HHG Tuition Academy — Backend (FastAPI)

Async FastAPI service following clean architecture, backed by PostgreSQL via
SQLAlchemy 2.0 (async) and Alembic migrations.

## Architecture

```
app/
├── main.py            # App factory: CORS, lifespan, router mounting
├── core/
│   ├── config.py      # Pydantic settings (loaded from .env)
│   ├── database.py    # Async engine, session factory, declarative Base
│   └── logging.py     # Logging configuration
├── api/
│   ├── deps.py        # Shared dependencies (db session)
│   └── v1/
│       ├── router.py  # Aggregates v1 routers
│       └── routes/    # Endpoint modules (health, + auth/courses/... later)
├── models/            # SQLAlchemy ORM models        (Phase 4+)
├── schemas/           # Pydantic DTOs                 (Phase 4+)
├── repositories/      # Data-access layer            (Phase 5+)
└── services/          # Business logic               (Phase 5+)
```

**Dependency direction:** `api → services → repositories → models`.
Routes never touch the ORM directly; services orchestrate repositories.

## Prerequisites

- Python 3.12+
- PostgreSQL (this environment: **port 4200**, database `hhg_academy`)

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate            # Windows
pip install -r requirements.txt

# Configure environment
copy .env.example .env            # then edit DATABASE_URL etc.
```

`.env` (local) must point `DATABASE_URL` at your Postgres instance, e.g.:

```
DATABASE_URL=postgresql+asyncpg://postgres:<password>@localhost:4200/hhg_academy
```

## Database migrations (Alembic)

```bash
# Create a new migration after changing models
.venv\Scripts\alembic revision --autogenerate -m "describe change"

# Apply migrations
.venv\Scripts\alembic upgrade head

# Roll back one step
.venv\Scripts\alembic downgrade -1
```

## Run the API

```bash
.venv\Scripts\uvicorn app.main:app --reload --port 8000
```

- API root: http://localhost:8000/
- Swagger docs: http://localhost:8000/docs
- Liveness: http://localhost:8000/api/v1/health
- DB readiness: http://localhost:8000/api/v1/health/db
