# Astro + Supabase Execution Notes

## 1) Environment Variables
Set the following variables for local development and Vercel:

- PUBLIC_SUPABASE_URL
- PUBLIC_SUPABASE_ANON_KEY

Copy `.env.example` to `.env` locally.

## 2) Supabase SQL (run in SQL editor)
```sql
create extension if not exists "pgcrypto";

create table if not exists public.landing_stats (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  label text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.landing_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.landing_portfolio_items (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  title text not null,
  medium text not null,
  technique text not null,
  year text not null,
  "gridClass" text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.landing_stats enable row level security;
alter table public.landing_partners enable row level security;
alter table public.landing_portfolio_items enable row level security;

-- Public can read landing data
create policy "public read stats" on public.landing_stats
for select to anon, authenticated
using (true);

create policy "public read partners" on public.landing_partners
for select to anon, authenticated
using (true);

create policy "public read portfolio" on public.landing_portfolio_items
for select to anon, authenticated
using (true);

-- Only authenticated users can mutate admin data
create policy "admin write stats" on public.landing_stats
for all to authenticated
using (true)
with check (true);

create policy "admin write partners" on public.landing_partners
for all to authenticated
using (true)
with check (true);

create policy "admin write portfolio" on public.landing_portfolio_items
for all to authenticated
using (true)
with check (true);

alter publication supabase_realtime add table public.landing_stats;
alter publication supabase_realtime add table public.landing_partners;
alter publication supabase_realtime add table public.landing_portfolio_items;
```

## 3) Admin Flow
- Visit `/admin`
- Sign in using a single Supabase Auth user (email/password)
- CRUD data from the panel
- Landing page updates in real time via Supabase Realtime

## 4) Vercel Deployment
- Import the repository into Vercel
- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY in project env vars
Using Node.js 20, Tailwind CSS v3.4.19, and Vite v7.2.4

Tailwind CSS has been set up with the shadcn theme

Setup complete: /mnt/agents/output/app

Components (40+):
  accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb,
  button-group, button, calendar, card, carousel, chart, checkbox, collapsible,
  command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,
  hover-card, input-group, input-otp, input, item, kbd, label, menubar,
  navigation-menu, pagination, popover, progress, radio-group, resizable,
  scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
  spinner, switch, table, tabs, textarea, toggle-group, toggle, tooltip

Usage:
  import { Button } from '@/components/ui/button'
  import { Card, CardHeader, CardTitle } from '@/components/ui/card'

Structure:
  src/sections/        Page sections
  src/hooks/           Custom hooks
  src/types/           Type definitions
  src/App.css          Styles specific to the Webapp
  src/App.tsx          Root React component
  src/index.css        Global styles
  src/main.tsx         Entry point for rendering the Webapp
  index.html           Entry point for the Webapp
  tailwind.config.js   Configures Tailwind's theme, plugins, etc.
  vite.config.ts       Main build and dev server settings for Vite
  postcss.config.js    Config file for CSS post-processing tools