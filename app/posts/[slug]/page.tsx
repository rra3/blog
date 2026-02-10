import type { Metadata } from "next";
import Link from "next/link";
import { renderMarkDown, getAllPosts } from "@/app/lib/markdown";
import Comments from "@/app/components/comments";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { html, meta } = await renderMarkDown(slug);
  const plainText = html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const description = plainText.length > 155 ? plainText.slice(0, 152) + "..." : plainText;

  return {
    title: meta.title,
    description,
    openGraph: {
      title: meta.title,
      description,
      type: "article",
      ...(meta.date ? { publishedTime: new Date(meta.date).toISOString() } : {}),
    },
  };
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
      {meta.image && meta.image_layout === "side" ? (
        <div className="flex flex-col gap-8 md:flex-row">
          <article className="min-w-0 flex-1" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="not-prose shrink-0 md:ml-8 md:max-w-[250px]">
            <img src={meta.image} alt="" className="w-full rounded" />
          </div>
        </div>
      ) : (
        <>
          {meta.image && (
            <img src={meta.image} alt="" className="not-prose mb-4 w-full rounded md:float-right md:mb-4 md:ml-8 md:max-w-[250px]" />
          )}
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </>
      )}
      <Comments />
      <Link href="/" className="text-sm no-underline">&larr; back</Link>
    </>
  );
}
