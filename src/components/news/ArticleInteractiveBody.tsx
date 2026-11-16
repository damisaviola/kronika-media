"use client";

import { useState } from "react";
import Link from "next/link";
import { ArticleReaderToolbar } from "./ArticleReaderToolbar";
import { TableOfContents } from "./TableOfContents";
import { Quote, AlertCircle, FileCheck2 } from "lucide-react";

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
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("serif");

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
    sm: "text-base leading-relaxed", // 16px
    base: "text-lg leading-relaxed", // 18px
    lg: "text-xl leading-loose",     // 20px
    xl: "text-2xl leading-loose",    // 22px
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

            {/* Kartu Profil Penulis */}
            <div className="bg-stone-100 p-4 border border-stone-300 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-stone-500">
                Tentang Jurnalis
              </span>
              <h4 className="font-serif font-bold text-base text-stone-900">
                {article.author.name}
              </h4>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                {article.author.bio || "Jurnalis investigasi independen untuk publikasi KRONIKA."}
              </p>
            </div>

            {/* Berita Terkait dalam Rubrik */}
            {relatedArticles.length > 0 && (
              <div className="border border-stone-300 bg-white p-4 space-y-3">
                <div className="border-b border-stone-200 pb-1 flex items-center justify-between">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950">
                    Liputan Terkait
                  </h4>
                  <span className="font-mono text-[10px] text-red-600 uppercase">
                    {article.category.name}
                  </span>
                </div>

                <div className="divide-y divide-stone-200">
                  {relatedArticles.map((rel) => (
                    <article key={rel.id} className="py-2.5 first:pt-0 last:pb-0 group">
                      <Link href={`/berita/${rel.slug}`} className="block">
                        <span className="font-mono text-[10px] text-stone-500 uppercase block mb-0.5">
                          {rel.readingTime} mnt baca
                        </span>
                        <h5 className="font-serif text-sm font-semibold text-stone-900 leading-snug group-hover:underline decoration-stone-900 underline-offset-2">
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
          {/* Intisari Liputan / Lead Box */}
          <div className="p-5 bg-stone-100/90 border-l-4 border-red-600 space-y-2">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Intisari Laporan Redaksi</span>
            </div>
            <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Article Full Body */}
          <div className={`${currentFontFamily} text-stone-900 space-y-6`}>
            {rawBlocks.map((block, idx) => {
              // Heading 2
              if (block.startsWith("## ")) {
                const text = block.replace("## ", "").trim();
                const id = slugify(text);
                return (
                  <h2
                    key={idx}
                    id={id}
                    className="font-serif text-2xl sm:text-3xl font-black text-stone-950 mt-10 mb-4 pt-6 border-t-2 border-stone-300 scroll-mt-20"
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
                    className="font-serif text-xl sm:text-2xl font-bold text-stone-950 mt-8 mb-3 pt-4 border-t border-stone-200 scroll-mt-20"
                  >
                    {text}
                  </h3>
                );
              }

              // Blockquote / Pull Quote (e.g. starts with "> " or contains long quotation)
              if (block.startsWith("> ")) {
                const quoteText = block.replace(/^>\s*/, "").trim();
                return (
                  <blockquote
                    key={idx}
                    className="my-8 p-6 bg-stone-100/80 border-l-4 border-stone-900 font-serif italic text-xl sm:text-2xl text-stone-900 leading-snug relative"
                  >
                    <Quote className="w-8 h-8 text-stone-300 absolute top-3 right-4 pointer-events-none" />
                    <p className="relative z-10">&ldquo;{quoteText}&rdquo;</p>
                  </blockquote>
                );
              }

              // Normal Paragraph
              const isFirstParagraph = idx === 0;
              return (
                <p
                  key={idx}
                  className={`${currentFontSize} text-stone-800 ${
                    isFirstParagraph ? "editorial-drop-cap font-sans sm:font-serif" : ""
                  }`}
                >
                  {block}
                </p>
              );
            })}
          </div>

          {/* Dewan Pers Transparency Notice */}
          <div className="mt-10 p-4 border border-stone-300 bg-stone-50 text-xs font-sans text-stone-600 space-y-1.5">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-stone-700" />
              <span>Transparansi & Hak Jawab Dewan Pers</span>
            </div>
            <p className="leading-relaxed">
              KRONIKA menjunjung tinggi Kode Etik Jurnalistik dan Pedoman Pemberitaan Media Siber. Jika Anda menemukan ketidakakuratan data, kekeliruan faktual, atau bermaksud menyampaikan hak jawab dan koreksi atas naskah liputan ini, silakan hubungi redaksi di{" "}
              <a href="mailto:redaksi@kronika.id" className="text-red-700 font-medium underline">
                redaksi@kronika.id
              </a>{" "}
              disertai rujukan bukti relevan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

