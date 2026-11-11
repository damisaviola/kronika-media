import Link from "next/link";
import { type ArticleWithRelations } from "@/lib/queries/articles";

interface BreakingTickerProps {
  articles: ArticleWithRelations[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="border-b border-stone-300 bg-stone-100/90 text-stone-900 text-xs py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 flex-shrink-0 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 uppercase">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span>Kilas Utama</span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            {articles.map((art, idx) => (
              <Link
                key={art.id}
                href={`/berita/${art.slug}`}
                className="inline-flex items-center gap-2 group hover:text-red-700 transition-colors"
              >
                <span className="font-mono text-[11px] text-stone-500 font-medium">
                  #{idx + 1}
                </span>
                <span className="font-serif italic font-medium text-stone-900 group-hover:underline decoration-stone-900 underline-offset-2">
                  {art.title}
                </span>
                {idx < articles.length - 1 && (
                  <span className="text-stone-300 font-mono select-none">/</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-stone-500 flex-shrink-0">
          <span>PEMBARUAN REAL-TIME</span>
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full inline-block" />
        </div>
      </div>
    </div>
  );
}

