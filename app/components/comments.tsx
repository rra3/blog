"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="not-prose mt-12">
      <Giscus
        repo="rra3/blog"
        repoId="R_kgDOQUoLuA"
        category="General"
        categoryId="DIC_kwDOQUoLuM4C2JoE"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
