# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, Next.js core-web-vitals + TypeScript rules)

No test framework is configured.

## Architecture

This is a personal blog built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and TypeScript.

**Markdown pipeline:** Blog posts are `.md` files in `app/markdown/` with YAML frontmatter (title, date, tags). `app/lib/markdown.ts` reads them at build time using `gray-matter` for frontmatter parsing and `remark` + `remark-html` for rendering. The `renderMarkDown(filename)` function takes a filename (without extension) and returns `{ html, meta }`.

**Rendering:** The home page (`app/page.tsx`) is a server component that calls `renderMarkDown()` and renders the result using `dangerouslySetInnerHTML` with Tailwind Typography (`prose` classes) for styling.

**Styling:** Base font is 14px monospace (Lucida Console/Monaco). CSS is in `app/globals.css` using Tailwind v4's `@import "tailwindcss"` syntax with `@config` pointing to `tailwind.config.mjs`. Dark mode uses `prefers-color-scheme`. The `@tailwindcss/typography` plugin handles rendered markdown styling.

**Path alias:** `@/*` maps to the project root (configured in tsconfig.json).
