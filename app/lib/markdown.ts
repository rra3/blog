import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { remark} from "remark";
import html from "remark-html";
import breaks from "remark-breaks";
import matter from "gray-matter";

export interface MarkdownMeta {
    title: string;
    date: string;
    tags: string[];
    image?: string;
    image_layout?: "float" | "side";
}

export async function renderMarkDown(filename: string) {
    const filePath = path.join(
        process.cwd(),
        "app",
        "markdown",
        `${filename}.md`
    );

    const source = await readFile(filePath, "utf8");
    const { content, data } = matter(source);
    const processed = await remark().use(breaks).use(html).process(content);

    return {
        html: processed.toString(),
        meta: {
            title: data.title ?? "",
            date: data.date ?? "",
            tags: data.tags ?? [],
            image: data.image,
            image_layout: data.image_layout,
        } as MarkdownMeta,
    };
}

export interface PostSummary {
    slug: string;
    title: string;
    date: string;
    tags: string[];
}

export async function getAllPosts(): Promise<PostSummary[]> {
    const dir = path.join(process.cwd(), "app", "markdown");
    const files = await readdir(dir);

    const posts: PostSummary[] = [];

    for (const file of files) {
        if (!file.endsWith(".md")) continue;
        const source = await readFile(path.join(dir, file), "utf8");
        const { data } = matter(source);
        if (!data.date) continue;
        posts.push({
            slug: file.replace(/\.md$/, ""),
            title: data.title ?? "",
            date: data.date,
            tags: data.tags ?? [],
        });
    }

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
}