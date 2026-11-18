import Link from "next/link";
import { type ArticleWithRelations } from "@/lib/queries/articles";
import { TrendingUp, Flame } from "lucide-react";

interface TrendingIndexProps {
  articles: ArticleWithRelations[];
  opinions?: ArticleWithRelations[];
}

export function TrendingIndex({ articles, opinions = [] }: TrendingIndexProps) {
  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 space-y-5">
      {/* Header Terpopuler */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
            <Flame className="w-4 h-4 fill-rose-600" />
          </div>
          <h3 className="font-bold text-sm text-zinc-950 uppercase tracking-wide">
            Trending Saat Ini
          </h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">24 Jam Terakhir</span>
      </div>

      {/* List 01 - 05 */}
      <ol className="divide-y divide-zinc-100">
        {articles.slice(0, 5).map((article, idx) => {
          const rank = String(idx + 1).padStart(2, "0");
          return (
            <li key={article.id} className="py-3 first:pt-0 last:pb-0 group">
              <Link href={`/berita/${article.slug}`} className="flex items-start gap-3">
                <span className={`text-xl font-black font-mono flex-shrink-0 w-7 transition-colors ${
                  idx === 0 ? "text-rose-600" : idx === 1 ? "text-amber-500" : "text-zinc-300 group-hover:text-zinc-700"
                }`}>
                  {rank}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-zinc-400">
                    <span className="text-rose-600 uppercase">
                      {article.category.name}
                    </span>
                    <span>·</span>
                    <span>{article.readingTime} mnt baca</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug group-hover:text-rose-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Rekomendasi Pilihan Editor */}
      {opinions.length > 0 && (
        <div className="pt-4 border-t border-zinc-100 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-700">
            <TrendingUp className="w-3.5 h-3.5 text-zinc-500" />
            <span>Pilihan Editor</span>
          </div>

          <div className="space-y-2.5">
            {opinions.slice(0, 2).map((op) => (
              <Link
                key={op.id}
                href={`/berita/${op.slug}`}
                className="block group bg-zinc-50 hover:bg-zinc-100/80 p-3 rounded-xl transition-colors"
              >
                <div className="text-[10px] font-semibold text-zinc-400 mb-1">
                  {op.category.name}
                </div>
                <h5 className="text-xs font-bold text-zinc-900 group-hover:text-rose-600 transition-colors leading-snug">
                  {op.title}
                </h5>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
