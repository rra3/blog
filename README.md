# bob blog

Personal blog at [boblog.ink](https://boblog.ink). Built with Next.js 16, React 19, Tailwind CSS 4, TypeScript. Deployed on Vercel.

## Features

- **MDX posts** — `.mdx` files in `app/markdown/` with YAML frontmatter. Rendered server-side via `next-mdx-remote/rsc`. React components (`PostImage`, `SpotifyEmbed`) can be embedded inline in post content.
- **Poetry-safe line breaks** — `remark-breaks` plugin preserves single newlines as `<br>`, so poems render correctly without needing blank lines between every line.
- **Image layouts** — frontmatter `image` + `image_layout` fields. Default floats the image right (good for prose). `side` layout uses flex (good for poetry where text wrapping would break line formatting).
- **Image lightbox** — clicking a post image opens a fullscreen modal with optional caption (`image_description` frontmatter). Closes via backdrop click, X button, or Escape.
- **Spotify embeds** — `spotify` frontmatter field or inline `<SpotifyEmbed url="..." />` in MDX. Converts Spotify URLs to embed iframes.
- **Comments** — Giscus (GitHub Discussions) on each post, mapped by pathname.
- **RSS feed** — `/feed.xml` generated from post list.
- **SEO** — `sitemap.xml`, `robots.txt`, per-post OpenGraph metadata with auto-generated descriptions.
- **Dark mode** — follows `prefers-color-scheme`.
- **Analytics** — Vercel Analytics.

## Development

```
npm run dev       # dev server on localhost:3000
npm run build     # production build
npm run lint      # ESLint
```

## Adding a post

Create `app/markdown/my-post.mdx`:

```mdx
---
title: My Post
date: 2025-01-01
tags: [essay]
image: /images/photo.jpg
image_description: A caption for the lightbox
spotify: https://open.spotify.com/track/xxx
---

Post content here. Single newlines become line breaks.

<SpotifyEmbed url="https://open.spotify.com/track/yyy" />
```

The slug is the filename without extension. Posts without a `date` are excluded from the index.
