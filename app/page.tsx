import Link from "next/link";
import { getAllPosts } from "./lib/markdown";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <pre className="overflow-x-auto text-xs leading-tight sm:text-sm">{` _         _      _    _
| |__  ___| |__  | |__| |___  __ _
| '_ \\/ _ \\ '_ \\ | '_ \\ / _ \\/ _\` |
|_.__/\\___/_.__/ |_.__/_\\___/\\__, |
                             |___/`}</pre>
          <h2>posts</h2>
          <ul className="list-none p-0">
            {posts.map((post) => {
              const formatted = new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              });
              return (
                <li key={post.slug} className="pl-0">
                  <span className="text-sm text-zinc-500">{formatted}</span>{" "}
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
