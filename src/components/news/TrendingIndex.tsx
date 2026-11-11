import Link from "next/link";
import { type ArticleWithRelations } from "@/lib/queries/articles";
import { formatJamWIB } from "@/lib/utils";

interface TrendingIndexProps {
  articles: ArticleWithRelations[];
  opinions?: ArticleWithRelations[];
}

export function TrendingIndex({ articles, opinions = [] }: TrendingIndexProps) {
  return (
    <div className="space-y-6">
      {/* Header Terpopuler */}
      <div className="border-b-2 border-stone-950 pb-1.5 flex items-center justify-between">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-stone-950">
          Terpopuler
        </h3>
        <span className="font-mono text-[10px] text-stone-500 uppercase">24 Jam Terakhir</span>
      </div>

      {/* List 01 - 05 */}
      <ol className="divide-y divide-stone-200">
        {articles.slice(0, 5).map((article, idx) => {
          const rank = String(idx + 1).padStart(2, "0");
          return (
            <li key={article.id} className="py-3 first:pt-0 last:pb-0 group">
              <Link href={`/berita/${article.slug}`} className="flex items-start gap-3">
                <span className="font-mono text-2xl font-bold text-stone-400 group-hover:text-red-600 transition-colors flex-shrink-0 w-8">
                  {rank}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-stone-500">
                    <span className="text-red-700 font-semibold">
                      {article.category.name}
                    </span>
                    <span>·</span>
                    <span>{article.readingTime} mnt baca</span>
                  </div>

                  <h4 className="font-serif text-base font-semibold text-stone-900 leading-snug group-hover:underline decoration-stone-900 underline-offset-4">
                    {article.title}
                  </h4>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Kolom Opini / Refleksi Redaksi */}
      {opinions.length > 0 && (
        <div className="mt-8 pt-4 border-t border-stone-300">
          <div className="border-b border-stone-900 pb-1 mb-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-950 flex items-center justify-between">
              <span>Kolom & Opini</span>
              <span className="text-[10px] font-normal text-stone-500">Gagasan Bebas</span>
            </h4>
          </div>

          <div className="space-y-4">
            {opinions.map((op) => (
              <article
                key={op.id}
                className="bg-stone-200/60 p-4 border-l-2 border-stone-900 group transition-colors hover:bg-stone-200/90"
              >
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase text-stone-600">
                  <span className="font-bold text-stone-900">{op.author.name}</span>
                  <span>·</span>
                  <span>{formatJamWIB(op.publishedAt)}</span>
                </div>

                <Link href={`/berita/${op.slug}`}>
                  <h5 className="font-serif italic font-semibold text-base text-stone-950 leading-snug group-hover:underline decoration-stone-900 underline-offset-4">
                    "{op.title}"
                  </h5>
                </Link>

                <p className="mt-1.5 text-xs text-stone-700 line-clamp-2 leading-relaxed font-sans">
                  {op.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
