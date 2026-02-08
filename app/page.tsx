import { renderMarkDown } from "./lib/markdown";


export default async function Home() {
  const { html, meta } = await renderMarkDown("lost-signals");
  const formattedDate = new Date(meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h2>{meta.title}</h2>
            <p className="text-sm text-zinc-500">{formattedDate}</p>
            <ul className="flex list-none gap-2 p-0">
              {meta.tags.map((tag) => (
                <li key={tag} className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {tag}
                </li>
              ))}
            </ul>
            <article dangerouslySetInnerHTML={{__html: html}} />
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        </div>
      </main>
    </div>
  );
}
