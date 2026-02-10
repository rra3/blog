import type { MetadataRoute } from "next";
import { getAllPosts } from "@/app/lib/markdown";

const BASE_URL = "https://boblog.ink";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [{ url: BASE_URL, lastModified: new Date() }, ...postEntries];
}
