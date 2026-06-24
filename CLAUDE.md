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

**Core loop:** Create trip → add items manually → choose "Add to Trip" (confirmed) or "Float Idea" (proposal) → if floating: group votes → organizer confirms → item moves to calendar.

**Dual-mode entry — the two modes are meaningfully different:**
- **"Add to Trip"** (`SCHEDULED` / `SAVE`): Item is immediately confirmed on selected members' trip calendars. All RSVPs are auto-accepted on creation (`status = 'accepted'`, `responded_at = NOW()`). No accept/decline step. Members get an "added you to" notification.
- **"Float Idea"** (`PROPOSE`): Item goes into the proposals bucket. Members see it in the voting UI and rank/vote. Organizer picks the winner and confirms it to the calendar. RSVPs stay `'pending'` until the organizer confirms. This is the genuine group-deliberation flow — don't confuse it with the above.

The toggle between these two modes is the `SaveProposeToggle` component (`client/src/components/save-propose-toggle.tsx`). It uses `saveMode`/`proposeMode` string values (`"SAVE"/"PROPOSE"` for flights, hotels, restaurants; `"SCHEDULED"/"PROPOSE"` for activities). Default labels are "Add to Trip" / "Float Idea" — don't add explicit overrides unless the labels genuinely differ.

**RSVP auto-accept:** When mode = SAVE/SCHEDULED, all member RSVPs (flights: `flight_rsvps`, hotels: `hotel_rsvps`, restaurants: `restaurant_rsvps`, activities: `activity_invites`) are inserted with `status = 'accepted'` and `responded_at = NOW()` at creation time. Only PROPOSE mode uses `'pending'` status so members can vote.

**Real-time:** WebSocket server initialized in `server/index.ts`; client hook `use-trip-realtime.ts` subscribes to trip-scoped events.

**Shared schema:** `shared/schema.ts` holds Zod types imported by both client (form validation) and server (request parsing). When adding a new field, update the schema here first.

**StatusBadge colors:** emerald=confirmed/accepted, blue=proposed/voting, amber=pending/voting-closed, rose=declined/cancelled, sky=in-progress, slate=unknown.

## Design System

The app uses a **teal light palette** throughout. Never introduce violet/purple gradients or dark-mode classes into UI components — these are off-brand.

**Color tokens:**
| Token | Value | Use |
|---|---|---|
| Primary teal | `#0D9488` | Buttons, active states, icons |
| Dark teal hover | `#0B7C73` | Button hover |
| Deep teal heading | `#0D3D39` | Headings, strong labels |
| Muted teal text | `rgba(13,61,57,0.65)` | Secondary text, descriptions |
| Teal bg wash | `rgba(13,148,136,0.06)` | Section backgrounds, chips |
| Teal border light | `rgba(13,148,136,0.15–0.20)` | Borders, dividers |

**Typography:** Fraunces (`font-fraunces`) for all dialog titles and display headings. DM Mono for body/UI text. Never use Inter, Roboto, or system fonts.

**Buttons:**
- Primary: `bg-[#0D9488] hover:bg-[#0B7C73] text-white`
- Cancel/ghost: `variant="ghost"` or `variant="outline"`, `text-[rgba(13,61,57,0.65)]`

**Dialog/modal pattern:**
```tsx
<DialogTitle className="font-fraunces text-[#0D3D39]">…</DialogTitle>
<DialogDescription className="text-[rgba(13,61,57,0.65)]">…</DialogDescription>
// footer:
<div className="border-t border-[rgba(13,148,136,0.15)] …">
```

## Development Branch

Active work happens on `claude/relaxed-noether-du8e43`. Push there; each batch of changes gets its own PR to `main`.

**Merged PRs:** #84–#87 (landing page teal rebrand + beach photos), #88–#91 (dashboard redesign: FeaturedTripCard, CompactTripPill, EmptyTripsState), #92–#94 (How It Works panel, Currency Converter, Profile page retheme; packing list fix).

**Open PRs:** #95 (form retheme + "Add to Trip"/"Float Idea" UX reframe + auto-accept RSVPs), #96 (activity modal dialog styling — title font, button color, footer border).

## Static Assets

Vite's root is `client/`, so static files must live in `client/public/` to be served at runtime. Landing page photos are at `client/public/landing/`. Do **not** put static assets in the root `public/` directory — Vite will not serve them from there.

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
