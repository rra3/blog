import { readFile } from "node:fs/promises";
import path from "node:path";
import { remark} from "remark"; 
import html from "remark-html";

export async function renderMarkDown(filename: string) {
    const filePath = path.join(
        process.cwd(),
        "app",
        "markdown",
        `${filename}.md`
    );

    const source = await readFile(filePath, "utf8");
    const processed = await remark().use(html).process(source);

    return processed.toString();
}