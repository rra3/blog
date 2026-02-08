import { readFile } from "node:fs/promises";
import path from "node:path";
import { remark} from "remark";
import html from "remark-html";
import matter from "gray-matter";

export interface MarkdownMeta {
    title: string;
    date: string;
    tags: string[];
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
    const processed = await remark().use(html).process(content);

    return {
        html: processed.toString(),
        meta: {
            title: data.title ?? "",
            date: data.date ?? "",
            tags: data.tags ?? [],
        } as MarkdownMeta,
    };
}