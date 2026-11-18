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
    <div className="border border-zinc-200/80 bg-white rounded-2xl p-5 space-y-3">
      <div className="border-b border-zinc-100 pb-2 flex items-center gap-2">
        <ListOrdered className="w-4 h-4 text-rose-600" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
          Daftar Isi
        </h4>
      </div>

      <nav className="space-y-1 font-sans text-xs">
        {headings.map((h, i) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block transition-colors leading-snug py-1 px-2 rounded-lg ${
                h.level === 3 ? "ml-2.5 text-[11px]" : "font-medium"
              } ${
                isActive
                  ? "bg-zinc-100 text-rose-600 font-bold"
                  : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              <span className="font-mono text-[10px] text-zinc-400 mr-1.5">
                0{i + 1}.
              </span>
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
