import type { Metadata } from "next";
import Link from "next/link";
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
  title: "bob blog",
  description: "bob's blog",
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
          <main className="flex min-h-screen w-full max-w-3xl flex-col py-32 px-16 bg-white dark:bg-black sm:items-start">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <Link href="/" className="not-prose block">
                <pre className="overflow-x-auto bg-transparent text-xs leading-tight sm:text-sm">{` _         _      _    _
| |__  ___| |__  | |__| |___  __ _
| '_ \\/ _ \\ '_ \\ | '_ \\ / _ \\/ _\` |
|_.__/\\___/_.__/ |_.__/_\\___/\\__, |
                             |___/`}</pre>
              </Link>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
