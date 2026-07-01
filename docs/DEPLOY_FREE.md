# Deploy HHG Academy for Free

A 100% free hosting setup:

| Part | Service | Free tier |
| --- | --- | --- |
| Database | **Neon** | Serverless Postgres, persistent |
| Backend (FastAPI) | **Render** | Web service — sleeps after 15 min idle (~50s cold start) |
| Frontend (Next.js) | **Vercel** | Hobby plan |

> ⚠️ **Two free-tier limits to know:**
> 1. The backend **sleeps** when idle; the first request after that waits ~50s.
> 2. Uploaded images are stored on the backend's disk, which Render's free tier
>    **wipes on restart** — so uploaded photos are temporary. (Move to Cloudinary/S3
>    later for permanence.)

---

## Step 0 — Push the code to GitHub

```bash
git remote add origin https://github.com/<you>/hhg-tuition-academy.git
git push -u origin main
```

Create the empty repo first at <https://github.com/new> (no README/.gitignore — the
project already has them).

---

## Step 1 — Database on Neon

1. Sign up at <https://neon.tech> (log in with GitHub).
2. Create a project → it gives you a **connection string** like:
   `postgresql://user:pass@ep-xxx.aws.neon.tech/neondb?sslmode=require`
3. Copy it — you'll paste it into Render as `DATABASE_URL`.
   (The backend auto-handles the `+asyncpg` driver and SSL, so paste it as-is.)

---

## Step 2 — Backend on Render

1. Sign up at <https://render.com> (log in with GitHub).
2. **New + → Blueprint** → select your repo. Render reads [`render.yaml`](../render.yaml)
   and creates the `hhg-backend` service.
3. In the service's **Environment** tab, set:
   | Key | Value |
   | --- | --- |
   | `DATABASE_URL` | your Neon connection string |
   | `BACKEND_CORS_ORIGINS` | _leave blank for now — set in Step 4_ |
4. Deploy. When it's live, note the URL, e.g. `https://hhg-backend.onrender.com`.
5. Check `https://hhg-backend.onrender.com/api/v1/health` → `{"status":"ok"}`.

### Seed the first admin (once)

Open the Render **Shell** tab and run:

```bash
python -m scripts.create_admin --email admin@gmail.com --password 'YOUR_STRONG_PW' --superadmin
python -m scripts.seed_data     # optional: sample courses/faculty/blog
```

---

## Step 3 — Frontend on Vercel

1. Sign up at <https://vercel.com> (log in with GitHub) → **Add New → Project** → your repo.
2. Set **Root Directory** = `frontend`.
3. Add Environment Variables:
   | Key | Value |
   | --- | --- |
   | `NEXT_PUBLIC_API_BASE_URL` | `https://hhg-backend.onrender.com/api/v1` |
   | `NEXT_PUBLIC_SITE_URL` | your Vercel URL, e.g. `https://hhg-academy.vercel.app` |
4. Deploy. You'll get a URL like `https://hhg-academy.vercel.app`.
   (If you set `NEXT_PUBLIC_SITE_URL` only after the first deploy, redeploy so the
   sitemap/robots/canonical URLs pick it up.)

---

## Step 4 — Connect them (CORS)

1. Back in **Render → hhg-backend → Environment**, set:
   | Key | Value |
   | --- | --- |
   | `BACKEND_CORS_ORIGINS` | `https://hhg-academy.vercel.app` |
2. Save → Render redeploys automatically.

---

## Step 5 — Verify live

- Visit your Vercel URL → public site loads with data from Neon.
- `…/admin/login` → sign in with the admin you seeded.
- Submit the contact form → appears in the admin Inquiries.

> First load after idle is slow (backend waking up) — that's the free-tier cold start.

---

## Updating the site

Every `git push` to `main` auto-deploys: Vercel rebuilds the frontend, Render
rebuilds the backend (and runs new migrations via the start command).
