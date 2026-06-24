# Yash Charde — AI Engineer Portfolio

A modern, responsive personal portfolio for an AI/ML engineer, built with
**Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, and
**Framer Motion**. It features a dark-futuristic theme with a light mode,
glassmorphism, glow gradients, scroll-reveal animation, and a built-in
**AI assistant** that answers recruiter questions about Yash.

## Overview

- **Single-page portfolio** composed of section components (Hero, About,
  Experience, Projects, Skills, Resume, Contact) plus a sticky navbar and footer.
- **Content-driven** — all copy (experience, projects, skills, education,
  certifications, contact) lives in `data/*.json` and is read through typed
  accessors in `lib/data.ts`. Edit the JSON, not the JSX.
- **AI assistant** — a floating chat widget and a dedicated `/ai-assistant` page
  call the `/api/chat` route. The route builds a factual knowledge base from the
  resume data, enforces a strict in-scope persona (only answers about Yash), and
  streams responses back to the browser.
- **Guardrails built in** — the chat API has per-client rate limiting, message/
  size limits, and a graceful fallback that keeps the site fully usable even when
  no AI credentials are configured.
- **Theming** — light/dark toggle via `next-themes` (defaults to dark), with
  CSS-variable design tokens defined in `app/globals.css`.

## Tech stack

- **Next.js 15** + **React 19** (App Router)
- **TypeScript**
- **Tailwind CSS 3** with CSS-variable theming + `tailwindcss-animate`
- **shadcn-style** reusable UI primitives (`Button`, `Card`, `Badge`) in `components/ui/`
- **Framer Motion** for scroll-reveal and entrance animation
- **next-themes** for the light/dark toggle
- **lucide-react** icons
- **react-markdown** + **remark-gfm** for rendering AI chat replies
- **Azure OpenAI** (`openai` SDK, streaming) powering the chat assistant
  *(the `@anthropic-ai/sdk` is also installed as an alternative provider)*

## Sections

Hero · About (education + certifications) · Experience timeline · Projects ·
Skills · Resume · Contact — plus a floating **"Ask AI about Yash"** chat widget
and a full-page `/ai-assistant`.

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx              # fonts, metadata, ThemeProvider
│   ├── page.tsx                # composes all sections
│   ├── globals.css             # theme tokens (light + dark) + utilities
│   ├── ai-assistant/page.tsx   # full-page AI assistant
│   └── api/chat/route.ts       # streaming chat endpoint (Azure OpenAI)
├── components/
│   ├── ui/                     # reusable primitives (button, card, badge)
│   ├── navbar · hero · about · experience · projects · skills
│   ├── resume-section · contact · footer
│   ├── chat-widget.tsx         # floating AI assistant
│   ├── ai-chat.tsx             # chat UI + streaming logic
│   ├── markdown-message.tsx    # renders assistant markdown
│   ├── ambient-background · reveal · section-heading
│   └── theme-provider · theme-toggle
├── data/                       # all content lives here
│   ├── resume.json · projects.json · experience.json
├── lib/                        # typed data accessors + cn() helper
├── legacy/                     # previous single-file static site (archived)
├── images/ · public/           # assets
└── YASH_CHARDE_RESUME.pdf      # downloadable resume
```

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Editing content

All copy (projects, experience, skills, education, certifications, contact) is in
`data/*.json`. Update those files — the components read them through `lib/data.ts`.

## AI chat assistant (optional)

The chat widget and `/ai-assistant` page call `/api/chat`, which uses **Azure
OpenAI**. To enable live answers, copy `.env.example` to `.env.local` and fill in
your Azure OpenAI details:

```bash
AZURE_OPENAI_ENDPOINT=https://<your-resource>.cognitiveservices.azure.com/
AZURE_OPENAI_API_KEY=<your-azure-openai-key>
AZURE_OPENAI_API_VERSION=2025-01-01-preview
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=gpt-4.1
```

Without credentials the site runs fine — the assistant just returns a short
canned summary and points visitors to email.

## Available scripts

```bash
npm run dev      # start the dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run Next.js lint
```

## Build & deploy

```bash
npm run build
npm run start
```

Deploys to **Vercel** with zero config (it auto-detects Next.js). Set the
`AZURE_OPENAI_*` variables in the Vercel project's environment variables to enable
the chat assistant in production.
</content>
</invoke>
