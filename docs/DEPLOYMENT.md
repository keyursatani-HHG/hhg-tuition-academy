# Deployment Guide — HHG Tuition Academy

This project deploys as two independent services:

- **Frontend** (Next.js) → **Vercel**
- **Backend** (FastAPI) + **PostgreSQL** → **VPS**

```
 Browser ──> Vercel (Next.js)  ──HTTPS──>  Nginx ──> Gunicorn/Uvicorn (FastAPI) ──> PostgreSQL
             api.yourdomain.com points at the VPS
```

---

## 1. Prerequisites

- A domain (e.g. `yourdomain.com`) with DNS access
- A VPS (Ubuntu 22.04+) for the backend
- A Vercel account for the frontend
- A strong `SECRET_KEY`:
  ```bash
  python -c "import secrets; print(secrets.token_urlsafe(48))"
  ```

---

## 2. Backend on the VPS

### Option A — Docker (recommended)

```bash
git clone <your-repo> /srv/hhg && cd /srv/hhg

# Provide production env values
cp backend/.env.example backend/.env
#   set DATABASE_URL, SECRET_KEY, ENVIRONMENT=production, DEBUG=false,
#   BACKEND_CORS_ORIGINS=https://yourdomain.com

# Build & run Postgres + backend (backend runs migrations on start)
SECRET_KEY=$(python3 -c "import secrets;print(secrets.token_urlsafe(48))") \
BACKEND_CORS_ORIGINS=https://yourdomain.com \
docker compose up -d --build
```

The API is now on `127.0.0.1:8000`. Seed the first admin once:

```bash
docker compose exec backend python -m scripts.create_admin \
  --email admin@yourdomain.com --password 'STRONG_PASSWORD' --superadmin
```

### Option B — systemd + virtualenv

```bash
sudo useradd -r -m -d /srv/hhg hhg
cd /srv/hhg/backend
python3.12 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env          # edit for production

# Install the service unit (see deploy/hhg-backend.service)
sudo cp /srv/hhg/deploy/hhg-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now hhg-backend
```

### Reverse proxy + TLS (both options)

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/hhg-api
sudo ln -s /etc/nginx/sites-available/hhg-api /etc/nginx/sites-enabled/
# edit server_name -> api.yourdomain.com
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d api.yourdomain.com   # issues + auto-redirects to HTTPS
```

Point an `A` record for `api.yourdomain.com` at the VPS IP first.

### Production environment (`backend/.env`)

```
ENVIRONMENT=production
DEBUG=false
DATABASE_URL=postgresql+asyncpg://hhg:STRONG_DB_PASSWORD@db:5432/hhg_academy
SECRET_KEY=<48+ char random string>
BACKEND_CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

> If you use managed Postgres instead of the compose `db` service, set
> `DATABASE_URL` to its host and ensure the `+asyncpg` driver prefix is present.

---

## 3. Frontend on Vercel

1. Import the repo in Vercel.
2. **Root Directory** → `frontend` (monorepo setting).
3. Framework preset: **Next.js** (auto-detected; `vercel.json` is included).
4. Environment Variables:
   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_API_BASE_URL` | `https://api.yourdomain.com/api/v1` |
5. Deploy. Add your custom domain (`yourdomain.com`) in Vercel’s Domains tab.

> `NEXT_PUBLIC_API_BASE_URL` is read at build time — redeploy after changing it.

### Frontend via Docker (alternative to Vercel)

```bash
cd frontend
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1 -t hhg-frontend .
docker run -p 3000:3000 hhg-frontend
```

---

## 4. Post-deploy checklist

- [ ] `https://api.yourdomain.com/api/v1/health` returns `{"status":"ok"}`
- [ ] `https://api.yourdomain.com/api/v1/health/db` returns `database: reachable`
- [ ] First admin created; can log in at `https://yourdomain.com/admin/login`
- [ ] `BACKEND_CORS_ORIGINS` includes the exact frontend origin (no trailing slash)
- [ ] `SECRET_KEY` is unique and secret; `DEBUG=false` in production
- [ ] Submitting the public contact form creates an inquiry visible in the admin
- [ ] Postgres data volume is backed up (e.g. `pg_dump` on a schedule)

---

## 5. Migrations

Migrations run automatically on container/service start (`alembic upgrade head`).
To create a new migration after changing models:

```bash
alembic revision --autogenerate -m "describe change"
alembic upgrade head
```

## 6. CI

`.github/workflows/ci.yml` runs on every push/PR to `main`:
- Frontend: `npm ci`, `npm run lint`, `npm run build`
- Backend: install deps, import check, `alembic upgrade head` against a Postgres service
