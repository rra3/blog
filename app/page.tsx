import Link from "next/link";
import { getAllPosts } from "./lib/markdown";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <>
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
    </>
  );
}
