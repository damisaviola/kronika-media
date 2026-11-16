"use client";

import { useEffect, useState } from "react";
import { ListOrdered } from "lucide-react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="border border-stone-300 bg-white p-4 space-y-3">
      <div className="border-b border-stone-200 pb-2 flex items-center gap-2">
        <ListOrdered className="w-3.5 h-3.5 text-stone-700" />
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950">
          Daftar Isi Liputan
        </h4>
      </div>

      <nav className="space-y-1.5 font-sans text-xs">
        {headings.map((h, i) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block transition-colors leading-snug py-1 pl-2 border-l-2 ${
                h.level === 3 ? "ml-2.5 text-[11px]" : "text-xs font-medium"
              } ${
                isActive
                  ? "border-stone-900 text-stone-950 font-bold bg-stone-50"
                  : "border-transparent text-stone-600 hover:text-stone-950 hover:border-stone-400"
              }`}
            >
              <span className="font-mono text-[10px] text-stone-400 mr-1.5">
                {String(i + 1).padStart(2, "0")}.
              </span>
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

