# Roadstar frontend (Phase 1)

Next.js · TypeScript · Tailwind public site + owner CMS.

## Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local   # if needed; .env.local already exists for local API
npm run dev
```

Requires the Django API on `http://127.0.0.1:8000` with `seed_demo` data.

## Scripts

- `npm run dev` — http://localhost:3000
- `npm run build` / `npm start`

## Staff CMS

Login at `/login` with `owner@roadstar.demo` / `DemoPass123!` then manage courses, fleet, and instructors under `/dashboard`.
