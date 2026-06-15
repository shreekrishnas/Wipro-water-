# Wipro Water — Webinar Analytics Dashboard

Glassmorphism dashboard for the Wipro Water webinar series (9 sessions),
built against the Trilliant global design system (Inter + Fraunces, brand
purple, glass surfaces, light/dark themes).

Inspired by the layout of the Right Horizons webinar analytics dashboard.

## Stack

- **React 19** + **Vite 5**
- **Tailwind v4** (via `@import "tailwindcss"`)
- **Recharts** for charts
- **react-router-dom** for navigation
- All visual tokens (colours, radii, shadows, blur) live in `src/index.css`
  as CSS variables matching the design spec — flip dark mode by setting
  `data-theme="dark"` on `<html>`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Where to put your real webinar data

Everything in the dashboard is derived from **one file**:

```
src/data/webinars.js
```

Open it and replace the placeholder fields for each of the 9 webinars
(`registrations`, `attendees`, `replayViews`, `speakers`, `industries`,
`countries`, `registrationsByDay`, `summary`, etc.). The KPIs, charts,
recent-webinars table, speakers page, audience page, and insights
comparisons all recompute automatically — no other file needs editing.

The shape of each webinar is documented at the top of that file.

## Pages

- **Overview** — top KPIs, registrations-vs-attendees chart, engagement
  scorecards, latest sessions table.
- **Webinars** — searchable / filterable card grid of all 9 webinars.
- **Webinar Detail** — per-session KPIs, registration build-up,
  industry mix, speakers, top countries, summary, engagement stats.
- **Speakers** — every speaker aggregated across sessions.
- **Audience** — geography + industry distribution across the series.
- **Insights** — cross-webinar comparisons and ranking.

## Design system

All surfaces, buttons, badges, and inputs reference the tokens in
`src/index.css`. Never hard-code a white background or a dark text colour
on a surface — use `var(--surface-card)` / `var(--text-primary)` etc.
so dark mode flips correctly.
