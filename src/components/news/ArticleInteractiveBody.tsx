"use client";

import { useState } from "react";
import Link from "next/link";
import { ArticleReaderToolbar } from "./ArticleReaderToolbar";
import { TableOfContents } from "./TableOfContents";
import { Quote, Sparkles } from "lucide-react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleInteractiveBodyProps {
  article: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    author: {
      name: string;
      role: string;
      bio: string | null;
    };
    category: {
      name: string;
      slug: string;
    };
  };
  relatedArticles: Array<{
    id: string;
    slug: string;
    title: string;
    readingTime: number;
  }>;
}

// Generate URL slug id for headings
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function ArticleInteractiveBody({
  article,
  relatedArticles,
}: ArticleInteractiveBodyProps) {
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("sans");

  // Parse raw text blocks
  const rawBlocks = article.content.split("\n\n").map((b) => b.trim()).filter(Boolean);

  // Extract headings for Table of Contents
  const headings: HeadingItem[] = [];
  rawBlocks.forEach((block) => {
    if (block.startsWith("## ")) {
      const text = block.replace("## ", "").trim();
      headings.push({ id: slugify(text), text, level: 2 });
    } else if (block.startsWith("### ")) {
      const text = block.replace("### ", "").trim();
      headings.push({ id: slugify(text), text, level: 3 });
    }
  });

  // Typography font size mapping
  const fontSizeClasses = {
    sm: "text-sm sm:text-base leading-relaxed",
    base: "text-base sm:text-lg leading-relaxed",
    lg: "text-lg sm:text-xl leading-relaxed",
    xl: "text-xl sm:text-2xl leading-relaxed",
  };

  const currentFontSize = fontSizeClasses[fontSize];
  const currentFontFamily = fontFamily === "serif" ? "font-serif" : "font-sans";

  return (
    <div className="space-y-6">
      {/* Interactive Reader Toolbar */}
      <ArticleReaderToolbar
        title={article.title}
        slug={article.slug}
        content={article.content}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
      />

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* Kolom Samping (Sidebar): TOC, Penulis, Terkait */}
        <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <div className="sticky top-6 space-y-6">
            {/* Table of Contents */}
            {headings.length > 0 && <TableOfContents headings={headings} />}

            {/* Kartu Profil Penulis Modern */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 font-mono">
                Penulis
              </span>
              <h4 className="font-bold text-base text-zinc-900">
                {article.author.name}
              </h4>
              <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                {article.author.bio || "Kontributor & kurator pop culture di KRONIKA."}
              </p>
            </div>

            {/* Berita Terkait dalam Rubrik */}
            {relatedArticles.length > 0 && (
              <div className="border border-zinc-200/80 bg-white rounded-2xl p-5 space-y-3">
                <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Artikel Terkait
                  </h4>
                  <span className="text-[11px] font-semibold text-rose-600">
                    {article.category.name}
                  </span>
                </div>

                <div className="divide-y divide-zinc-100">
                  {relatedArticles.map((rel) => (
                    <article key={rel.id} className="py-2.5 first:pt-0 last:pb-0 group">
                      <Link href={`/berita/${rel.slug}`} className="block">
                        <span className="text-[10px] text-zinc-400 font-mono uppercase block mb-0.5">
                          {rel.readingTime} mnt baca
                        </span>
                        <h5 className="text-xs sm:text-sm font-semibold text-zinc-800 leading-snug group-hover:text-rose-600 transition-colors">
                          {rel.title}
                        </h5>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Kolom Utama: Konten Berita */}
        <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
          {/* Quick Take / Intisari Artikel */}
          <div className="p-5 bg-zinc-100/80 rounded-2xl border border-zinc-200/80 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intisari Topik</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-700 font-medium leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Article Full Body */}
          <div className={`${currentFontFamily} text-zinc-900 space-y-6 leading-relaxed`}>
            {rawBlocks.map((block, idx) => {
              // Heading 2
              if (block.startsWith("## ")) {
                const text = block.replace("## ", "").trim();
                const id = slugify(text);
                return (
                  <h2
                    key={idx}
                    id={id}
                    className="text-xl sm:text-2xl font-black text-zinc-950 mt-10 mb-4 pt-6 border-t border-zinc-200 scroll-mt-20 tracking-tight"
                  >
                    {text}
                  </h2>
                );
              }

              // Heading 3
              if (block.startsWith("### ")) {
                const text = block.replace("### ", "").trim();
                const id = slugify(text);
                return (
                  <h3
                    key={idx}
                    id={id}
                    className="text-lg sm:text-xl font-bold text-zinc-950 mt-8 mb-3 pt-4 scroll-mt-20 tracking-tight"
                  >
                    {text}
                  </h3>
                );
              }

              // Blockquote
              if (block.startsWith("> ")) {
                const quoteText = block.replace(/^>\s*/, "").trim();
                return (
                  <blockquote
                    key={idx}
                    className="my-6 p-5 sm:p-6 bg-zinc-50 border-l-4 border-zinc-950 rounded-r-2xl italic text-base sm:text-lg text-zinc-800 leading-snug relative"
                  >
                    <Quote className="w-7 h-7 text-zinc-300 absolute top-3 right-4 pointer-events-none" />
                    <p className="relative z-10">&ldquo;{quoteText}&rdquo;</p>
                  </blockquote>
                );
              }

              // Normal Paragraph
              return (
                <p
                  key={idx}
                  className={`${currentFontSize} text-zinc-800 leading-relaxed`}
                >
                  {block}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
