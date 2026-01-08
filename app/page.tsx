import Image from "next/image";

import { renderMarkDown } from "./lib/markdown";


export default async function Home() {
  //const helloHtml = await renderMarkDown("hello");
  const lostSignalsHtml = await renderMarkDown("lost-signals");
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <article dangerouslySetInnerHTML={{__html: lostSignalsHtml}} />
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        </div>
      </main>
    </div>
  );
}
