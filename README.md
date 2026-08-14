# Agentic Rate Card

A simple server-rendered Next.js rate card for estimating agentic AI work across research, document creation, coding, design iteration, model stacks, GPU infrastructure, and multi-agent workflows.

The page is content-first and rendered on the server for search engines and a fast first paint, with no client-side data dependency.

## Contents

- [`app/page.tsx`](app/page.tsx) — server-rendered rate card content
- [`app/globals.css`](app/globals.css) — responsive editorial layout
- [`AI_Work_Rate_Card.html`](AI_Work_Rate_Card.html) — legacy standalone one-page export
- [`AI_Project_Token_Cost_One_Page.md`](AI_Project_Token_Cost_One_Page.md) — Markdown companion
- [`AI_Project_Token_Cost_Guide.docx`](AI_Project_Token_Cost_Guide.docx) — longer-form document

The SSR app is also published at [agentic-rate-card-ideo-vanderlin.vercel.app](https://agentic-rate-card-ideo-vanderlin.vercel.app/).

## Run locally

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run build
npm run start
```
