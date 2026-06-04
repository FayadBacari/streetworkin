# StreetWork'in

StreetWork'in is a platform that will aim to organize events around street workout as well as promote the upcoming StreetWork'in brand gym

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)](https://sass-lang.com)

## Stack and versions

The frontend versions below come from `streetworkin-frontend/package.json`. The backend section lists the target stack — the `streetworkin-backend` workspace will be created next; if `package.json` ever drifts from the table, the `package.json` file is the source of truth.

| Area | Technology | Version (reference) |
|------|------------|---------------------|
| Web | **Next.js** | 16.2.6 (App Router, Turbopack) |
| Web | **React** | 19.2.x |
| Web | **TypeScript** | ~5.x |
| Web | Styling | Sass ^1.99 (SCSS modules, BEM, shared variables & mixins) |
| Web | Fonts | `next/font/google` (Anton, `display: swap`) |
| Web | Images | `next/image` (Next 16 — `preload` instead of deprecated `priority`) |
| Backend | **Node.js** | >= 20 (aligned with the frontend requirement) |
| Backend | **TypeScript** | ~5.7.x |


## Prerequisites

- **Node.js** `>= 20.9` — required by Next.js 16 on the frontend and recommended for the NestJS backend.

## Run locally

### Frontend (`streetworkin-frontend`)

1. `cd streetworkin-frontend`
2. `npm install`
3. `npm run dev` — starts the Next.js dev server on `http://localhost:3000`.

Build & run a production bundle:

```bash
npm run build
npm run start
```

> The build pipeline validates TypeScript and SCSS in one pass (`next build`). If you're on macOS with `nvm`, make sure the active Node is `>= 20` (`nvm use 22` is the project default).

### Backend (`streetworkin-backend`) — coming soon

The backend folder doesn't exist in the repo yet. Once scaffolded:

1. `cd streetworkin-backend`
2. Copy `streetworkin-backend/.env.example` to `.env` and fill in the variables (PostgreSQL URL, JWT secret, etc.).
3. `npm install`
4. `npx prisma migrate dev` — applies the database schema.
5. `npm run start:dev` — starts NestJS on **port 4000** (the frontend will read `NEXT_PUBLIC_API_URL` to reach it).

## Repository structure and architecture (high-level)

The **frontend** uses the **Next.js App Router** with a strict split between Server Components (default) and Client Components (`"use client"` only when state, refs, or browser APIs are required). Shared SCSS lives in `src/styles/` (variables + mixins centralizing colors, shadows, breakpoints, fonts, and helpers like `backdrop-blur` and the `tablet`/`mobile` responsive mixins). Routes are declared once in `src/constants/routes.ts` and consumed everywhere via the `ROUTES` object — no string literals scattered across components.

The **backend** will follow a **module-based** NestJS architecture (`src/modules/<domain>/`): controllers, services, repositories, DTOs, and validation schemas live next to each other per business domain. PostgreSQL is accessed through Prisma, with migrations versioned under `prisma/migrations/`. HTTP responses use a shared envelope shape (`{ data }` for success, `{ error }` for failures) produced by a global exception filter, so the frontend can rely on a single response contract.

### Frontend detailed

The frontend (`streetworkin-frontend`) is layered to keep route definitions, presentation, and reusable logic clearly separated:

- `src/app/`: App Router routes (`page.tsx` per segment) plus reserved files (`layout.tsx`, `not-found.tsx`, `globals.scss`). Each route ships its own scoped `page.scss`.
- `src/components/`: reusable UI primitives (`Button`, `Form`, `Counter`, `Header`, `Footer`, `SiteVideoBackground`) with their styles in `src/components/ui/`.
- `src/constants/`: single source of truth for non-presentational values — `routes.ts` (`ROUTES` object + `Route` type), `site-media.ts` (`BACKGROUND_VIDEO_URL`, `BLURRED_VIDEO_ROUTES`, `HIDDEN_VIDEO_ROUTES`).
- `src/hooks/`: presentation-agnostic hooks (`useBackgroundMode` returns `shouldHide` / `shouldBlur` from the current pathname).
- `src/styles/`: shared SCSS — `_variables.scss` (colors, shadows, radii, breakpoints, font stack) and `_mixins.scss` (`tablet` / `mobile` responsive mixins, `button-base`, `backdrop-blur($filters)` with `-webkit-` fallback for Safari).

Main frontend rules:

- Pages stay thin — they compose components and consume `ROUTES` / hooks. No business logic in `page.tsx`.
- SCSS uses **BEM** consistently and **never** hardcodes a value that exists in `_variables.scss` (colors, shadows, radii, breakpoints, font stack).
- Responsive breakpoints go through `@include tablet` / `@include mobile` — never raw `@media (max-width: …)`.
- Images go through `next/image`; above-the-fold logos use `loading="eager"` (Next 16 deprecates `priority`).
- Background video can be **blurred** (e.g. `/streetworkin`, `/login`, `/register`) or **paused** on a per-route basis via `BLURRED_VIDEO_ROUTES` / `HIDDEN_VIDEO_ROUTES` in `site-media.ts` — paused routes call `video.pause()` via a `useEffect`, not just visually hidden.

