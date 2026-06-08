# KTF Web (Astro + React + Supabase)

Website Program Studi Kriya Tekstil & Fashion with:

- Astro as the app shell
- React components for the landing and admin interface
- Supabase for auth, CRUD, and realtime updates

## Local development

1. Install dependencies:
   `npm install`
2. Copy environment template:
   `cp .env.example .env`
3. Fill Supabase values in `.env`
4. Run dev server:
   `npm run dev`

## Main routes

- `/` landing page
- `/admin` admin CRUD panel (single admin account via Supabase Auth)

## Build

- `npm run build`
- `npm run preview`

## Supabase setup

SQL schema and RLS/realtime policy examples are available in [info.md](info.md).
