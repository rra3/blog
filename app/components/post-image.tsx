"use client";

import { useState, useEffect, useCallback } from "react";

export default function PostImage({
  src,
  alt,
  className,
  description,
}: {
  src: string;
  alt: string;
  className?: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className ?? ""} cursor-pointer`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 text-3xl leading-none text-white hover:text-zinc-300"
            aria-label="Close"
          >
            &times;
          </button>
          <div
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="min-h-0 max-w-[90vw] shrink object-contain"
            />
            {description && (
              <p className="mt-3 max-w-prose shrink-0 text-center text-sm text-zinc-300">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
