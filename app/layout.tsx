import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boblog.ink"),
  title: {
    template: "%s — bob blog",
    default: "bob blog — robert arnold",
  },
  description:
    "Personal blog by Robert Arnold (Bobby Arnold) — writing from Lawrenceville, Georgia, near Atlanta. Essays, poems, and reflections.",
  keywords: [
    "robert arnold",
    "bobby arnold",
    "robert r arnold",
    "robert remsen arnold",
    "bob arnold",
    "lawrenceville",
    "atlanta",
  ],
  authors: [{ name: "Robert Arnold" }],
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": "https://boblog.ink/feed.xml",
    },
  },
  openGraph: {
    title: "bob blog — robert arnold",
    description:
      "Personal blog by Robert Arnold (Bobby Arnold) — writing from Lawrenceville, Georgia, near Atlanta. Essays, poems, and reflections.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex min-h-screen w-full max-w-3xl flex-col pt-16 pb-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <Link href="/" className="not-prose mb-12 block">
                <pre className="overflow-x-auto bg-transparent text-base leading-tight sm:text-lg">{` _         _      _    _
| |__  ___| |__  | |__| |___  __ _
| '_ \\/ _ \\ '_ \\ | '_ \\ / _ \\/ _\` |
|_.__/\\___/_.__/ |_.__/_\\___/\\__, |
                             |___/`}</pre>
              </Link>
              {children}
            </div>
            <footer className="not-prose mt-16 w-full border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/rra3" target="_blank" rel="noopener noreferrer">github</a>
                <a href="https://instagram.com/robertrarnold" target="_blank" rel="noopener noreferrer">instagram</a>
                <a href="https://threads.com/@robertrarnold" target="_blank" rel="noopener noreferrer">threads</a>
                <a href="https://facebook.com/robertrarnold" target="_blank" rel="noopener noreferrer">facebook</a>
                <a href="https://bsky.app/profile/x-bob-x.bsky.social" target="_blank" rel="noopener noreferrer">bluesky</a>
                <a href="https://mastodon.social/@rra3" target="_blank" rel="noopener noreferrer">mastodon</a>
                <a href="/feed.xml">rss</a>
              </div>
              <p className="mt-4">&copy; {new Date().getFullYear()} robert r arnold III</p>
            </footer>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
