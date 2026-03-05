import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import breaks from "remark-breaks";
import matter from "gray-matter";
import PostImage from "@/app/components/post-image";
import SpotifyEmbed from "@/app/components/spotify-embed";

export interface MarkdownMeta {
    title: string;
    date: string;
    tags: string[];
    image?: string;
    image_layout?: "float" | "side";
    image_description?: string;
    spotify?: string;
    breaks?: boolean;
}

const mdxComponents = {
    PostImage,
    SpotifyEmbed,
};

export async function renderMarkDown(filename: string) {
    const filePath = path.join(
        process.cwd(),
        "app",
        "markdown",
        `${filename}.mdx`
    );

    const source = await readFile(filePath, "utf8");
    const { data: fm } = matter(source);

    const { content, frontmatter } = await compileMDX<MarkdownMeta>({
        source,
        components: mdxComponents,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: fm.breaks ? [breaks] : [],
            },
        },
    });

    return {
        content,
        meta: {
            title: frontmatter.title ?? "",
            date: frontmatter.date ?? "",
            tags: frontmatter.tags ?? [],
            image: frontmatter.image,
            image_layout: frontmatter.image_layout,
            image_description: frontmatter.image_description,
            spotify: frontmatter.spotify,
        } as MarkdownMeta,
    };
}

export async function getPostPlainText(filename: string): Promise<string> {
    const filePath = path.join(
        process.cwd(),
        "app",
        "markdown",
        `${filename}.mdx`
    );

    const source = await readFile(filePath, "utf8");
    const { content } = matter(source);

    return content
        .replace(/!\[.*?\]\(.*?\)/g, "")   // images
        .replace(/\[([^\]]*)\]\(.*?\)/g, "$1") // links → text
        .replace(/#{1,6}\s+/g, "")          // headings
        .replace(/[*_~`>]/g, "")            // inline formatting
        .replace(/<[^>]*>/g, "")            // HTML/JSX tags
        .replace(/\n+/g, " ")              // newlines → spaces
        .replace(/\s+/g, " ")              // collapse whitespace
        .trim();
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
        if (!file.endsWith(".mdx")) continue;
        const source = await readFile(path.join(dir, file), "utf8");
        const { data } = matter(source);
        if (!data.date) continue;
        posts.push({
            slug: file.replace(/\.mdx$/, ""),
            title: data.title ?? "",
            date: data.date,
            tags: data.tags ?? [],
        });
    }

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
}
