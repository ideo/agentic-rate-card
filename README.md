# Agentic Rate Card

A simple server-rendered Next.js rate card for estimating agentic AI work across research, document creation, coding, design iteration, model stacks, GPU infrastructure, and multi-agent workflows.

The page is content-first and rendered on the server for search engines and a fast first paint, with no client-side data dependency.

## Contents

- [`app/page.tsx`](app/page.tsx) — server-rendered rate card content
- [`app/globals.css`](app/globals.css) — responsive editorial layout
- [`AI_Work_Rate_Card.html`](AI_Work_Rate_Card.html) — legacy standalone one-page export
- [`AI_Project_Token_Cost_One_Page.md`](AI_Project_Token_Cost_One_Page.md) — Markdown companion
- [`AI_Project_Token_Cost_Guide.docx`](AI_Project_Token_Cost_Guide.docx) — longer-form document

The SSR app is also published at [agentic-ratecard.vercel.app](https://agentic-ratecard.vercel.app/).

## Run locally

```bash
npm install
npm run dev
```

The local development server runs at `http://localhost:3002` so it does not collide with other projects using port 3000.

For a production check:

```bash
npm run build
npm run start
```

## Refresh model pricing

The calculator reads its model rates from [`data/model-prices.json`](data/model-prices.json). To review the official provider pages before changing a rate, run:

```bash
npm run sync:prices
```

This creates a local `data/pricing-source-snapshot.json` with the latest price-related source snippets. Review it, update `data/model-prices.json`, and commit the revised rate file. The generated snapshot is intentionally ignored by Git so a provider-page layout change never silently changes published prices.
