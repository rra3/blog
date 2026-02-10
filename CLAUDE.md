# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, Next.js core-web-vitals + TypeScript rules)

No test framework is configured.

## Architecture

This is a personal blog built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and TypeScript. Deployed on Vercel at `boblog.ink`.

**Markdown pipeline:** Blog posts are `.md` files in `app/markdown/` with YAML frontmatter (title, date, tags, optional image, optional image_layout). `app/lib/markdown.ts` reads them at build time using `gray-matter` for frontmatter parsing and `remark` + `remark-html` + `remark-breaks` for rendering. Single newlines are preserved as `<br>` (important for poetry formatting). Two key exports:
- `renderMarkDown(filename)` — takes a filename (without extension), returns `{ html, meta }`
- `getAllPosts()` — reads all `.md` files, skips those without a date, returns sorted by date descending

**Routing:**
- `app/page.tsx` — index page listing all posts (date + linked title)
- `app/posts/[slug]/page.tsx` — dynamic article view with `generateStaticParams()` for static generation

**Image layouts:** Posts can include an `image` frontmatter field pointing to a file in `public/images/`. The `image_layout` field controls display:
- Default (float) — image floats right with text wrapping around it (good for prose)
- `side` — image sits beside content in a flex layout (good for poetry where line breaks matter)
- Optional `image_description` frontmatter field adds a caption shown in the lightbox overlay

**Image lightbox:** `app/components/post-image.tsx` is a client component that renders thumbnails and opens a fullscreen modal on click. Closes via backdrop click, X button, or Escape. Supports an optional `description` prop for captions.

**Layout:** `app/layout.tsx` contains the shared page shell including:
- ASCII art header (figlet "small" font) that links to the index
- Tailwind Typography (`prose` classes) wrapper
- Footer with social links (GitHub, Instagram, Threads, Facebook, Bluesky, Mastodon) and copyright
- Vercel Analytics (`@vercel/analytics`)

**Comments:** Article pages include Giscus (`@giscus/react`) for comments, powered by GitHub Discussions on the repo. Configured in `app/components/comments.tsx` as a client component.

**Styling:** Base font is 14px monospace (Lucida Console/Monaco). CSS is in `app/globals.css` using Tailwind v4's `@import "tailwindcss"` syntax with `@config` pointing to `tailwind.config.mjs`. Dark mode uses `prefers-color-scheme`. The `@tailwindcss/typography` plugin handles rendered markdown styling.

**Path alias:** `@/*` maps to the project root (configured in tsconfig.json).
