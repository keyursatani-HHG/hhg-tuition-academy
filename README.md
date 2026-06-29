# HHG Tuition Academy

Full-stack portal for HHG Tuition Academy — a public marketing site plus an admin
portal for managing courses, faculty, achievements, inquiries, and more.

## Tech Stack

| Layer       | Technology                                   |
| ----------- | -------------------------------------------- |
| Frontend    | Next.js (App Router) + Tailwind CSS          |
| Backend     | Python FastAPI                               |
| Database    | PostgreSQL 18                                |
| ORM         | SQLAlchemy + Alembic migrations              |
| Auth        | JWT (admin portal)                           |
| Deployment  | Vercel (frontend) + VPS (backend)            |

## Repository Layout

```
hhg-tuition-academy/
├── frontend/            # Next.js application  → Vercel
├── backend/             # FastAPI application  → VPS
├── docs/                # Design system & reference
│   └── DESIGN_SYSTEM.md # Tokens extracted from the Stitch UI export
├── docker-compose.yml   # Local dev: Postgres (+ backend)
└── README.md
```

## Design Source

The UI was designed in **Google Stitch**. The original export lives in
`_ui_extracted/` (git-ignored). The canonical design tokens — colors, typography,
spacing, radii, shadows — are preserved in [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
and reproduced exactly in `frontend/tailwind.config.ts`.

## Getting Started

See each package's README:

- Frontend → [`frontend/README.md`](frontend/README.md)
- Backend  → [`backend/README.md`](backend/README.md)

## Build Phases

This project was built phase by phase — all complete:

- **Phase 0** — Environment check & monorepo scaffold ✅
- **Phase 1** — Frontend foundation + Home page ✅
- **Phase 2** — Remaining public pages (About, Courses, Faculty, Achievements, Contact) ✅
- **Phase 3** — Backend foundation (FastAPI, DB, migrations) ✅
- **Phase 4** — JWT admin authentication ✅
- **Phase 5** — Domain APIs (courses, faculty, inquiries, …) ✅
- **Phase 6** — Admin portal UI (`/admin/*`) ✅
- **Phase 7** — Public ↔ API integration ✅
- **Phase 8** — DevOps & deployment ✅

## Local Development

```bash
# Backend (terminal 1)
cd backend && .venv/Scripts/activate && uvicorn app.main:app --reload --port 8000

# Frontend (terminal 2)
cd frontend && npm run dev    # http://localhost:3000
```

Public site: http://localhost:3000 · Admin: http://localhost:3000/admin/login · API docs: http://localhost:8000/docs

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — Vercel (frontend) + VPS (backend + Postgres),
with Docker Compose, Nginx, systemd, and CI all included.
