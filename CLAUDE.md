# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Float is a collaborative group trip planner. The core loop is: create a trip → add ideas to a wish list → float items to the group as proposals → vote → schedule confirmed items to a shared calendar. Auth, manual entry, and voting are the live features; search integrations (flights, hotels, activities) exist in code but are hidden behind feature flags.

## Commands

```bash
npm run dev          # start Express (port 5000) + Vite dev server (port 3000)
npm run build        # build client (Vite) + backend (esbuild → dist/index.js)
npm run check        # TypeScript type-check (tsc --noEmit)
npm run test         # Jest (ts-jest, ESM mode)
npm start            # production: node dist/index.js
```

There are pre-existing TypeScript errors in `server/` and some page files that are not caused by recent changes — run `npx tsc --noEmit --skipLibCheck` and filter by the file you touched before treating errors as your own.

## Architecture

**Monorepo layout:**
- `client/` — React 18 + TypeScript + Vite (Wouter routing, TanStack Query, shadcn/ui + Tailwind)
- `server/` — Express REST API + WebSocket (tsx runtime in dev, esbuild bundle in prod)
- `shared/` — Zod schemas and utilities used by both sides

**Client→Server connection:**
- Dev: Vite proxy forwards `/api/*`, `/search/*`, `/health` to `http://localhost:5000`
- Prod: Express serves the built `client/dist/` and handles all routes

**Path aliases:** `@/*` → `client/src/*`, `@shared/*` → `shared/*`

**Database:** PostgreSQL via `pg` pool (`server/db.ts`). Raw SQL everywhere — no ORM. Schema in `server/initdb.sql` (auto-applied on server start). No migration tool; schema changes go directly into `initdb.sql`.

**Auth:** Session-based via `express-session` + `connect-pg-simple`. Session data: `{ userId, authProvider }`. Middleware: `server/sessionAuth.ts` — `isAuthenticated` auto-creates a "demo-user" session in dev when no session exists. Frontend: `useAuth()` hook hits `GET /api/auth/user`.

**API surface:** Nearly all endpoints live in the monolithic `server/routes.ts` (~250KB). Services for external APIs live in `server/*Service.ts` files (Amadeus, Duffel, Foursquare, Google Maps, Pexels, OpenWeather).

**CORS:** Allowed origins and headers in `server/corsConfig.ts`. Custom headers (e.g. `X-Trip-Share-Code`) must be listed in `CORS_ALLOWED_HEADERS` or preflight will fail.

## Feature Flags

`client/src/lib/featureFlags.ts` controls which search UIs are visible. Current state:

```ts
FLIGHT_SEARCH: false   // Amadeus/Duffel — API keys not configured
HOTEL_SEARCH: false    // Hardcoded samples — not production-ready
ACTIVITY_SEARCH: false // Amadeus — API keys not configured
RESTAURANT_SEARCH: true // Foursquare — works, returns real in-app results
```

Flip any flag to `true` to re-enable the corresponding search UI. All search code is preserved.

## Key Patterns

**Data flow for proposals ("floats"):** Manual item added → user chooses "Propose to Group" → proposal record created with voting deadline → members vote → organizer confirms → item scheduled to calendar and RSVP invites sent.

**Dual-mode entry:** Flights, hotels, restaurants, and activities all support two modes: "Schedule & Invite" (creates confirmed booking + RSVP invites) and "Propose to Group" (creates a voteable proposal).

**Real-time:** WebSocket server initialized in `server/index.ts`; client hook `use-trip-realtime.ts` subscribes to trip-scoped events.

**Shared schema:** `shared/schema.ts` holds Zod types imported by both client (form validation) and server (request parsing). When adding a new field, update the schema here first.

**StatusBadge colors:** emerald=confirmed/accepted, blue=proposed/voting, amber=pending/voting-closed, rose=declined/cancelled, sky=in-progress, slate=unknown.

## Development Branch

Active work happens on `claude/nifty-edison-lv78om`. Push there; each batch of changes needs a new PR to `main` (previous PR #68 merged wish-list fix; PR #69 merged feature flags).

## Environment Variables

| Var | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (required) |
| `SESSION_SECRET` | Session signing key |
| `VITE_API_URL` | Backend URL for client (optional in dev, required in prod) |
| `FOURSQUARE_API_KEY` | Restaurant search |
| `PEXELS_API_KEY` | Trip cover photos |
| `AMADEUS_CLIENT_ID/SECRET` | Flights + activities search (currently flag-disabled) |
| `DUFFEL_API_KEY` | Alternative flight search (flag-disabled) |
| `GOOGLE_MAPS_API_KEY` | Location autocomplete |

## Frontend Aesthetics

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

<use_interesting_fonts>
Typography instantly signals quality. Avoid using boring, generic fonts.

**Never use:** Inter, Roboto, Open Sans, Lato, default system fonts

**Impact choices:**
- Code aesthetic: JetBrains Mono, Fira Code, Space Grotesk
- Editorial: Playfair Display, Crimson Pro, Fraunces
- Startup: Clash Display, Satoshi, Cabinet Grotesk
- Technical: IBM Plex family, Source Sans 3
- Distinctive: Bricolage Grotesque, Obviously, Newsreader

**Pairing principle:** High contrast = interesting. Display + monospace, serif + geometric sans, variable font across weights.

**Use extremes:** 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x.

Pick one distinctive font, use it decisively. Load from Google Fonts. State your choice before coding.
</use_interesting_fonts>
