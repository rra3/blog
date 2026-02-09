import Link from "next/link";
import { renderMarkDown, getAllPosts } from "@/app/lib/markdown";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { html, meta } = await renderMarkDown(slug);
  const formattedDate = new Date(meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <>
      <Link href="/" className="text-sm no-underline">&larr; back</Link>
      <h2>{meta.title}</h2>
      <p className="text-sm text-zinc-500">{formattedDate}</p>
      <ul className="flex list-none gap-2 p-0">
        {meta.tags.map((tag) => (
          <li key={tag} className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {tag}
          </li>
        ))}
      </ul>
      <article dangerouslySetInnerHTML={{ __html: html }} />
      <Link href="/" className="text-sm no-underline">&larr; back</Link>
    </>
  );
}
